// production rebuild trigger
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

/* ── Config from environment ──────────────────────────────────────────────── */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/* ── Validate — fail loud in dev, silent in prod ──────────────────────────── */
const requiredKeys = ["apiKey", "authDomain", "projectId", "appId"] as const;

requiredKeys.forEach((key) => {
  if (!firebaseConfig[key]) {
    const msg = `⚠️  Missing Firebase env var: NEXT_PUBLIC_FIREBASE_${key
      .replace(/([A-Z])/g, "_$1")
      .toUpperCase()}. Check your .env.local file.`;
    if (process.env.NODE_ENV === "development") {
      console.warn(msg);
    }
  }
});

/* ── Initialise (safe for Next.js HMR) ────────────────────────────────────── */
const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
// Firebase Storage removed — images now served from Cloudinary CDN

/* ── Connection verification (dev only) ───────────────────────────────────── */
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development" &&
  firebaseConfig.projectId
) {
  console.log(
    `✅ Firebase Connected — project: ${firebaseConfig.projectId}`
  );
}

export default app;
