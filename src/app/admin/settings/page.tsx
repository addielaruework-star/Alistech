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
  User,
  KeyRound,
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
      // 1. Re-authenticate client
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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
          Admin Settings & Security
        </h1>
        <p className="text-sm text-[#64748b] mt-1">
          Manage your administrator credentials and account security settings.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#0f172a] text-[#7CFF4F] font-sora font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
            {user?.email ? user.email[0].toUpperCase() : "A"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#0f172a]">
                {user?.email || "Authorized Administrator"}
              </h2>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>
            <p className="text-xs text-[#64748b] mt-0.5">Role: Administrator (CMS Full Access)</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748b]">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>RBAC Verified</span>
        </div>
      </div>

      {/* Password Update Card */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Banner */}
        <div className="flex gap-4 items-start pb-5 border-b border-[#f1f5f9]">
          <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0 text-[#0f172a]">
            <KeyRound className="w-5 h-5 text-[#0f172a]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0f172a]">Update Password</h3>
            <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
              Ensure your administrative account remains protected with a strong, high-entropy password.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4.5">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                required
                className="w-full pl-3.5 pr-11 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] placeholder:text-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a] focus:outline-none transition-colors p-1"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters with numbers and letters"
                required
                className="w-full pl-3.5 pr-11 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] placeholder:text-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a] focus:outline-none transition-colors p-1"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Realtime password validation helpers */}
            {newPassword && (
              <div className="grid grid-cols-2 gap-2 mt-2.5 p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                {[
                  { check: hasMinLength, label: "At least 8 characters" },
                  { check: hasUppercase, label: "Uppercase letter" },
                  { check: hasLowercase, label: "Lowercase letter" },
                  { check: hasNumber, label: "Number digit" },
                ].map(({ check, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        check ? "text-emerald-600" : "text-[#cbd5e1]"
                      }`}
                    />
                    <span className={check ? "text-[#0f172a] font-medium" : "text-[#94a3b8]"}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="w-full pl-3.5 pr-11 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] placeholder:text-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a] focus:outline-none transition-colors p-1"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && (
              <p
                className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${
                  matchesConfirm ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {matchesConfirm ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Passwords match
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" /> Passwords do not match
                  </>
                )}
              </p>
            )}
          </div>

          {/* Feedback messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#0f172a] hover:bg-[#1e293b] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#7CFF4F] focus:ring-offset-2 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#7CFF4F]" />
                <span>Updating Password...</span>
              </span>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </form>
      </div>

      {/* Security Info Card Footer */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3 text-xs text-[#64748b]">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>End-to-end encrypted session · Firebase Authentication protected</span>
        </div>
        <span className="text-[11px] font-semibold text-[#0f172a] bg-[#f8fafc] px-2.5 py-1 rounded-md border border-[#e2e8f0]">
          AlisTech CMS Internal
        </span>
      </div>
    </div>
  );
}
