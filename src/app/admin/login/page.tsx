"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminLoginPage() {
  const { signIn, resetPassword } = useAuth();

  // Mode: "login" or "recovery"
  const [mode, setMode] = useState<"login" | "recovery">("login");

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Recovery form state
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoverySubmitted, setRecoverySubmitted] = useState(false);
  const [showEmailHelp, setShowEmailHelp] = useState(false);

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginLoading) return;

    setLoginLoading(true);
    setLoginError(null);

    try {
      await signIn(email.trim(), password);
    } catch {
      setLoginError("Invalid email or password. Please verify your credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Password Recovery submission
  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryLoading) return;

    setRecoveryLoading(true);

    try {
      // Call Firebase sendPasswordResetEmail
      await resetPassword(recoveryEmail.trim());
    } catch {
      // Neutral handling: do not reveal whether the account exists
    } finally {
      setRecoveryLoading(false);
      // Neutral confirmation message displayed regardless of whether email exists
      setRecoverySubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] relative overflow-hidden font-inter selection:bg-[#7CFF4F] selection:text-[#0f172a]">
      {/* Background subtle mesh gradients */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124, 255, 79, 0.12) 0%, rgba(248, 250, 252, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none opacity-40 blur-[100px]"
        style={{ background: "rgba(15, 23, 42, 0.04)" }}
      />

      {/* ── Dedicated Admin Header ─────────────────────────────────────────── */}
      <header className="relative z-20 w-full border-b border-[#e2e8f0] bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Portal Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#7CFF4F] rounded-lg"
            aria-label="AlisTech Home"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-[#e2e8f0] bg-white shadow-xs shrink-0">
              <Image
                src="/alistech-official-logo.jpg"
                alt="AlisTech Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sora font-bold text-lg text-[#0f172a] tracking-tight">
                Alis<span className="gradient-text font-extrabold">Tech</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#0f172a]/5 text-[#0f172a] border border-[#0f172a]/10">
                CMS Admin
              </span>
            </div>
          </Link>

          {/* Return to Public Website */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#475569] hover:text-[#0f172a] px-3 py-1.5 rounded-lg hover:bg-[#f1f5f9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7CFF4F]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to website</span>
          </Link>
        </div>
      </header>

      {/* ── Main Centered Content ─────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-9 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06),0_4px_12px_-2px_rgba(15,23,42,0.03)]">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                /* ── LOGIN VIEW ────────────────────────────────────────────── */
                <motion.div
                  key="login"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex w-12 h-12 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-2 items-center justify-center mb-4 shadow-2xs">
                      <Image
                        src="/alistech-official-logo.jpg"
                        alt="AlisTech"
                        width={32}
                        height={32}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
                      Admin Sign In
                    </h1>
                    <p className="text-[#64748b] text-sm mt-1.5">
                      Sign in to manage your CMS leads, projects, and reviews.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4.5">
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="admin-email"
                        className="block text-xs font-semibold text-[#0f172a] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="admin-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="admin@alistech.dev"
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] placeholder:text-[#94a3b8] transition-all duration-150 focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 hover:border-[#94a3b8]"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="admin-password"
                          className="text-xs font-semibold text-[#0f172a]"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setMode("recovery");
                            setRecoveryEmail(email);
                            setRecoverySubmitted(false);
                            setLoginError(null);
                          }}
                          className="text-xs font-semibold text-[#0f172a] hover:text-[#475569] underline underline-offset-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7CFF4F] rounded"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          id="admin-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="w-full pl-3.5 pr-11 py-2.5 sm:py-3 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] placeholder:text-[#94a3b8] transition-all duration-150 focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 hover:border-[#94a3b8]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#7CFF4F] rounded-md p-0.5 transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Error Alert */}
                    {loginError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs leading-relaxed"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#0f172a] text-white hover:bg-[#1e293b] active:scale-[0.99] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-xs focus:outline-none focus:ring-2 focus:ring-[#7CFF4F] focus:ring-offset-2"
                    >
                      {loginLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Dashboard</span>
                          <ArrowRight className="w-4 h-4 text-[#7CFF4F]" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* ── ACCOUNT RECOVERY VIEW ─────────────────────────────────── */
                <motion.div
                  key="recovery"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Recovery Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex w-12 h-12 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-2 items-center justify-center mb-4 shadow-2xs">
                      <Image
                        src="/alistech-official-logo.jpg"
                        alt="AlisTech"
                        width={32}
                        height={32}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
                      Recover Access
                    </h1>
                    <p className="text-[#64748b] text-sm mt-1.5">
                      Enter your registered administrator email to receive a password reset link.
                    </p>
                  </div>

                  {/* Neutral Confirmation or Form */}
                  {recoverySubmitted ? (
                    <div className="space-y-4">
                      <div
                        role="status"
                        className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs leading-relaxed space-y-1.5"
                      >
                        <div className="flex items-center gap-2 font-semibold text-emerald-800 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Request Received</span>
                        </div>
                        <p className="text-emerald-700">
                          If an account is registered with this email, password reset instructions have been sent. Please check your inbox and spam folder.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setRecoverySubmitted(false);
                          setMode("login");
                        }}
                        className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Sign In</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRecoverySubmit} className="flex flex-col gap-4">
                      <div>
                        <label
                          htmlFor="recovery-email"
                          className="block text-xs font-semibold text-[#0f172a] mb-1.5"
                        >
                          Registered Administrator Email
                        </label>
                        <input
                          id="recovery-email"
                          name="email"
                          type="email"
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                          required
                          autoComplete="email"
                          placeholder="admin@alistech.dev"
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] placeholder:text-[#94a3b8] transition-all duration-150 focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 hover:border-[#94a3b8]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={recoveryLoading}
                        className="w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#0f172a] text-white hover:bg-[#1e293b] active:scale-[0.99] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-xs focus:outline-none focus:ring-2 focus:ring-[#7CFF4F] focus:ring-offset-2"
                      >
                        {recoveryLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Reset Link...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Password Reset Link</span>
                            <ArrowRight className="w-4 h-4 text-[#7CFF4F]" />
                          </>
                        )}
                      </button>

                      {/* Back Button */}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Cancel and return to Sign In</span>
                      </button>
                    </form>
                  )}

                  {/* ── Forgotten Email Administrator Guidance ───────────────── */}
                  <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
                    <button
                      type="button"
                      onClick={() => setShowEmailHelp(!showEmailHelp)}
                      className="w-full flex items-center justify-between text-left text-xs font-medium text-[#475569] hover:text-[#0f172a] py-1 transition-colors group"
                      aria-expanded={showEmailHelp}
                    >
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-[#64748b] group-hover:text-[#0f172a]" />
                        <span>Forgotten your administrator email?</span>
                      </span>
                      {showEmailHelp ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#94a3b8]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
                      )}
                    </button>

                    {showEmailHelp && (
                      <div className="mt-3 p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs text-[#475569] space-y-2 leading-relaxed">
                        <p className="font-semibold text-[#0f172a]">
                          How to locate the authorized account:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-[#475569]">
                          <li>
                            Open the <strong>Firebase Console</strong> for this project.
                          </li>
                          <li>
                            Navigate to <strong>Build &gt; Authentication &gt; Users</strong> to view registered email addresses.
                          </li>
                          <li>
                            In <strong>Firestore Database</strong>, open the <strong>users</strong> collection to confirm which user UID has the field <code className="bg-[#e2e8f0] px-1 py-0.5 rounded text-[11px] text-[#0f172a]">role: &quot;admin&quot;</code>.
                          </li>
                          <li>
                            Enter that verified email address above to receive your reset link.
                          </li>
                        </ol>
                        <p className="text-[11px] text-[#64748b] pt-1">
                          Note: For security reasons, administrative email addresses are never listed publicly.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Security Subtitle */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#94a3b8] mt-6 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
            <span>AlisTech CMS · Protected by Firebase Authentication</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
