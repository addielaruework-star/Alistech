"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface AuthState {
  user: User | null;
  isAdmin: boolean;          // ← true only when users/{uid}.role === "admin"
  loading: boolean;          // ← true until both auth AND role are resolved
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

/* ── Context ──────────────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        /* ── Role check: read users/{uid} from Firestore ──────────────────
           The document must contain:  { role: "admin" }
           Any other value or missing document = not admin.
        ──────────────────────────────────────────────────────────────────── */
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const role = userDoc.exists() ? userDoc.data()?.role : null;
          setIsAdmin(role === "admin");
        } catch (err) {
          // If Firestore read fails (e.g. no rules yet), deny admin
          console.error("Role check failed:", err);
          setIsAdmin(false);
        }
      } else {
        // Signed out — clear admin flag immediately
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will re-fire and re-check the role automatically
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
