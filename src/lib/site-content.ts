import { unstable_cache } from "next/cache";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type SiteContentHistoryEntry } from "@/types/site-content";

/**
 * Reads published site content with a 60-second revalidation cache.
 * Falls back strictly and safely to provided defaults in case of
 * missing documents, network timeouts, or permission errors.
 */
export async function getSiteContent<T>(
  section: string,
  defaults: T
): Promise<T> {
  // If running client-side, query Firestore directly without unstable_cache
  if (typeof window !== "undefined") {
    try {
      const docSnap = await getDoc(doc(db, "siteContent", section));
      if (docSnap.exists()) {
        const raw = docSnap.data();
        return (raw?.content as T) ?? defaults;
      }
      return defaults;
    } catch (err) {
      console.warn(`[getSiteContent:client] Falling back to defaults for "${section}":`, err);
      return defaults;
    }
  }

  // Server-side: use Next.js unstable_cache with 60-second TTL
  try {
    const cachedFetcher = unstable_cache(
      async () => {
        try {
          const docSnap = await getDoc(doc(db, "siteContent", section));
          if (docSnap.exists()) {
            const raw = docSnap.data();
            return (raw?.content as T) ?? defaults;
          }
          return defaults;
        } catch (fetchErr) {
          console.warn(`[getSiteContent] Fetch error for "${section}", using fallback:`, fetchErr);
          return defaults;
        }
      },
      [`site-content-${section}`],
      {
        revalidate: 60,
        tags: [`site-content-${section}`],
      }
    );

    return await cachedFetcher();
  } catch (cacheErr) {
    console.warn(`[getSiteContent] Cache wrapper fallback for "${section}":`, cacheErr);
    return defaults;
  }
}

/**
 * Retrieves the current working draft for an admin editor.
 * If no draft exists yet, falls back to the live published content or defaults.
 */
export async function getDraftContent<T>(
  section: string,
  defaults: T
): Promise<T> {
  try {
    const draftSnap = await getDoc(doc(db, "siteContentDrafts", section));
    if (draftSnap.exists()) {
      const raw = draftSnap.data();
      return (raw?.content as T) ?? defaults;
    }

    // Fallback to live published content if draft is empty
    const liveSnap = await getDoc(doc(db, "siteContent", section));
    if (liveSnap.exists()) {
      const raw = liveSnap.data();
      return (raw?.content as T) ?? defaults;
    }

    return defaults;
  } catch (err) {
    console.warn(`[getDraftContent] Failed to fetch draft for "${section}":`, err);
    return defaults;
  }
}

/**
 * Saves a work-in-progress draft to the siteContentDrafts collection.
 */
export async function saveDraftContent<T>(
  section: string,
  content: T,
  userEmail?: string
): Promise<void> {
  const ref = doc(db, "siteContentDrafts", section);
  await setDoc(
    ref,
    {
      section,
      content,
      updatedAt: serverTimestamp(),
      updatedBy: userEmail ?? "admin",
    },
    { merge: true }
  );
}

/**
 * Publishes content live:
 * 1. Commits to live `siteContent/{section}`
 * 2. Archives an immutable snapshot in `siteContentHistory`
 * 3. Keeps `siteContentDrafts/{section}` in sync
 */
export async function publishContent<T>(
  section: string,
  content: T,
  userEmail?: string
): Promise<void> {
  const liveRef = doc(db, "siteContent", section);
  const draftRef = doc(db, "siteContentDrafts", section);

  // 1. Write live document
  await setDoc(
    liveRef,
    {
      section,
      content,
      publishedAt: serverTimestamp(),
      publishedBy: userEmail ?? "admin",
    },
    { merge: true }
  );

  // 2. Archive to version history
  await addDoc(collection(db, "siteContentHistory"), {
    section,
    content,
    publishedAt: serverTimestamp(),
    publishedBy: userEmail ?? "admin",
  });

  // 3. Sync draft
  await setDoc(
    draftRef,
    {
      section,
      content,
      updatedAt: serverTimestamp(),
      updatedBy: userEmail ?? "admin",
    },
    { merge: true }
  );
}

/**
 * Fetches version history entries for a given section (newest first).
 */
export async function getContentHistory<T = any>(
  section: string
): Promise<SiteContentHistoryEntry<T>[]> {
  try {
    const q = query(
      collection(db, "siteContentHistory"),
      where("section", "==", section)
    );
    const snap = await getDocs(q);

    const entries = snap.docs.map((d) => ({
      id: d.id,
      section: d.data().section,
      content: d.data().content,
      publishedAt: d.data().publishedAt,
      publishedBy: d.data().publishedBy,
    }));

    // Client-side sort to prevent requiring composite index
    return entries.sort((a, b) => {
      const timeA = a.publishedAt?.toDate ? a.publishedAt.toDate().getTime() : 0;
      const timeB = b.publishedAt?.toDate ? b.publishedAt.toDate().getTime() : 0;
      return timeB - timeA;
    }) as any;
  } catch (err) {
    console.error(`[getContentHistory] Failed to load history for "${section}":`, err);
    return [];
  }
}

/**
 * Restores a historic snapshot into the draft collection for admin review.
 */
export async function restoreContentVersion(
  section: string,
  historyId: string,
  userEmail?: string
): Promise<any> {
  const historySnap = await getDoc(doc(db, "siteContentHistory", historyId));
  if (!historySnap.exists()) {
    throw new Error(`Version history document "${historyId}" not found.`);
  }

  const restoredContent = historySnap.data()?.content;
  await saveDraftContent(section, restoredContent, userEmail);
  return restoredContent;
}
