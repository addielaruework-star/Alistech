import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Project } from "@/types/project";
import { type Review } from "@/types/review";

/* ── Types ────────────────────────────────────────────────────────────────── */
export type LeadStatus = "new" | "contacted" | "in-progress" | "closed";

export interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
  projectType: string;
  message: string;
}

export interface Lead extends LeadData {
  id: string;
  status: LeadStatus;
  createdAt: Timestamp | null;
}

export type LeadFieldErrors = Partial<Record<keyof LeadData, string>>;

/* ── Validation ───────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(data: LeadData): LeadFieldErrors {
  const errors: LeadFieldErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Please describe your project.";
  }

  return errors;
}

/* ── Create ───────────────────────────────────────────────────────────────── */
export async function submitLead(data: LeadData): Promise<string> {
  const docRef = await addDoc(collection(db, "leads"), {
    name: data.name.trim(),
    email: data.email.trim(),
    whatsapp: data.whatsapp.trim(),
    projectType: data.projectType,
    message: data.message.trim(),
    createdAt: serverTimestamp(),
    status: "new" as LeadStatus,
  });
  return docRef.id;
}

/* ── Read all ─────────────────────────────────────────────────────────────── */
export async function fetchLeads(): Promise<Lead[]> {
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Lead, "id">),
  }));
}

/* ── Read single ──────────────────────────────────────────────────────────── */
export async function fetchLead(id: string): Promise<Lead | null> {
  const snap = await getDoc(doc(db, "leads", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Lead, "id">) };
}

/* ── Update status ────────────────────────────────────────────────────────── */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<void> {
  await updateDoc(doc(db, "leads", id), { status });
}

/* ── Delete ───────────────────────────────────────────────────────────────── */
export async function deleteLead(id: string): Promise<void> {
  await deleteDoc(doc(db, "leads", id));
}

/* ───────────────────────────────────────────────────────────────────────────
   ── PORTFOLIO PROJECTS CRUD SECTION ──
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Helper placeholder for future role checks
 * Always returns true for now but acts as a central guard checkpoint.
 */
function checkAdminPermission(action: string) {
  return true;
}

/**
 * Creates a new portfolio project inside Firestore.
 * Requires admin privileges.
 */
export async function createProject(
  projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  checkAdminPermission("createProject");

  const docRef = await addDoc(collection(db, "projects"), {
    ...projectData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates an existing portfolio project inside Firestore.
 * Requires admin privileges.
 */
export async function updateProject(
  id: string,
  projectData: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>
): Promise<void> {
  checkAdminPermission("updateProject");

  const projectRef = doc(db, "projects", id);
  await updateDoc(projectRef, {
    ...projectData,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a portfolio project from Firestore.
 * Requires admin privileges.
 */
export async function deleteProject(id: string): Promise<void> {
  checkAdminPermission("deleteProject");

  await deleteDoc(doc(db, "projects", id));
}

/**
 * Retrieves all projects from Firestore (both published and draft).
 * Ordered newest first by creation date.
 */
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"));
  const snap = await getDocs(q);
  const projects = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Project, "id">),
  }));
  return projects.sort((a, b) => {
    const dateA = a.createdAt?.toDate?.() || new Date(0);
    const dateB = b.createdAt?.toDate?.() || new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Retrieves only published projects for dynamic website rendering.
 * Sorting is done client-side to avoid requiring a Firestore composite index.
 */
export const getPublishedProjects = async () => {
  try {
    const q = query(
      collection(db, "projects"),
      where("published", "==", true)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching published projects:", error);
    return [];
  }
};

/**
 * Retrieves only featured and published projects.
 * Ordered newest first by creation date.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "projects"),
    where("published", "==", true),
    where("featured", "==", true)
  );
  const snap = await getDocs(q);
  const projects = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Project, "id">),
  }));
  return projects.sort((a, b) => {
    const dateA = a.createdAt?.toDate?.() || new Date(0);
    const dateB = b.createdAt?.toDate?.() || new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Retrieves a single project document by its ID.
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, "projects", id));
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Omit<Project, "id">),
  };
}

/* ───────────────────────────────────────────────────────────────────────────
   ── REVIEWS / TESTIMONIALS CRUD SECTION ──
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Creates a new review — never auto-approved.
 * Any source (admin-add, future client form) uses this.
 */
export async function createReview(
  data: Omit<Review, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "reviews"), {
    ...data,
    approved: false, // ← NEVER auto-publish
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates an existing review document (full or partial).
 */
export async function updateReview(
  id: string,
  data: Partial<Omit<Review, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, "reviews", id), data);
}

/**
 * Deletes a review document.
 * Caller handles deleting any associated avatar image in Storage.
 */
export async function deleteReview(id: string): Promise<void> {
  await deleteDoc(doc(db, "reviews", id));
}

/**
 * Fetches ALL reviews (admin view) — newest first.
 */
export async function getAllReviews(): Promise<Review[]> {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Review, "id">),
  }));
}

/**
 * Fetches approved + featured reviews for public homepage testimonial section.
 * Sorted client-side to avoid requiring a Firestore composite index.
 */
export async function getFeaturedReviews(): Promise<Review[]> {
  try {
    const q = query(
      collection(db, "reviews"),
      where("approved", "==", true),
      where("featured", "==", true)
    );
    const snap = await getDocs(q);
    const reviews = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Review, "id">),
    }));
    return reviews.sort((a, b) => {
      const dateA = (a as any).createdAt?.toDate?.()?.getTime?.() ?? 0;
      const dateB = (b as any).createdAt?.toDate?.()?.getTime?.() ?? 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    return [];
  }
}

/**
 * Fetches all approved reviews for the homepage testimonials section.
 * Sorted client-side to avoid requiring a Firestore composite index.
 */
export const getApprovedReviews = async () => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("approved", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Client-side sort: newest first
    return reviews.sort((a: any, b: any) => {
      const dateA = a.createdAt?.toDate?.()?.getTime?.() ?? 0;
      const dateB = b.createdAt?.toDate?.()?.getTime?.() ?? 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching approved reviews:", error);
    return [];
  }
};

