"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Lock,
  Calendar,
  RefreshCw,
} from "lucide-react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ── Visibility Toggles ────────────────────────────────────────────────── */
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ── States ────────────────────────────────────────────────────────────── */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ── Password validation checks ────────────────────────────────────────── */
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const matchesConfirm = newPassword === confirmPassword && confirmPassword !== "";

  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber;
  const canSubmit = isPasswordValid && matchesConfirm && currentPassword !== "" && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !user || !user.email) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Re-authenticate client (Required by Firebase Auth for security-sensitive updates)
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 2. Perform password update
      await updatePassword(user, newPassword);

      // 3. Handle success and clear form
      setSuccess("Your administrator password has been updated successfully.");
      toast.success("Security password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password update error:", err);
      if (err?.code === "auth/wrong-password") {
        setError("The current password you entered is incorrect.");
        toast.error("Incorrect current password entered");
      } else {
        setError(err?.message || "Failed to update password. Please try again.");
        toast.error(err?.message || "Failed to update password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-sora font-bold text-xl text-white mb-1">Settings</h1>
        <p className="text-white/35 text-sm">
          Manage your system configurations and security.
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 lg:p-8 space-y-6">
        {/* Security Header Banner */}
        <div className="flex gap-4 items-start pb-5 border-b border-white/[0.05]">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Administrator Security</h2>
            <p className="text-xs text-white/35 mt-1 leading-relaxed">
              Ensure your account is protected with a high-entropy password. For security reasons, you may need to sign in again after changing your password.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-4 pr-11 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all caret-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 focus:outline-none transition-colors"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full pl-4 pr-11 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all caret-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 focus:outline-none transition-colors"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Realtime password validation helpers */}
            {newPassword && (
              <div className="grid grid-cols-2 gap-2 mt-3 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                {[
                  { check: hasMinLength, label: "At least 8 characters" },
                  { check: hasUppercase, label: "Contains uppercase" },
                  { check: hasLowercase, label: "Contains lowercase" },
                  { check: hasNumber, label: "Contains number" },
                ].map(({ check, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-[10px]">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${check ? "text-green-400" : "text-white/10"}`}
                      fill={check ? "currentColor" : "none"}
                    />
                    <span className={check ? "text-white/50" : "text-white/20"}>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Must match new password"
                className="w-full pl-4 pr-11 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all caret-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 focus:outline-none transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && (
              <p className={`text-[10px] mt-1.5 flex items-center gap-1 ${matchesConfirm ? "text-green-400/80" : "text-red-400/80"}`}>
                <AlertCircle className="w-3 h-3" />
                {matchesConfirm ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Alert messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-red-500/25 bg-red-500/[0.06] text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-green-500/25 bg-green-500/[0.06] text-green-400 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_16px_rgba(37,99,235,0.3)] mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Updating Security Info...
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>

      {/* Info Card / Optional Nice Touch */}
      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.005] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-white/35" />
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/25">Last Security Action</p>
            <p className="text-xs text-white/65 mt-0.5">Password changed recently</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/25 border border-white/[0.06] px-2.5 py-1 rounded-full bg-white/[0.01]">
          <Lock className="w-3 h-3 text-blue-400" /> Fully Encrypted Session
        </div>
      </div>
    </div>
  );
}
