"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { Zap, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      await signIn(email.trim(), password);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.45)]">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-sora font-bold text-xl text-white">
            Alis<span className="text-blue-400">Tech</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-white/[0.07] p-8 overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 56px rgba(0,0,0,0.35)",
          }}
        >
          <div className="text-center mb-7">
            <h1 className="font-sora font-bold text-lg text-white mb-1">
              Admin Access
            </h1>
            <p className="text-white/35 text-xs">
              Sign in to manage your leads and projects.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@alistech.dev"
                className="w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.05] border border-white/[0.08] placeholder:text-white/25 caret-blue-400 transition-all duration-200 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)] hover:border-white/[0.15]"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl text-sm text-white bg-white/[0.05] border border-white/[0.08] placeholder:text-white/25 caret-blue-400 transition-all duration-200 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)] hover:border-white/[0.15]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 focus:outline-none transition-colors"
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

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-red-500/25 bg-red-500/[0.06] text-red-400 text-xs"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.005 }}
              whileTap={{ scale: loading ? 1 : 0.995 }}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow:
                  "0 0 22px rgba(37,99,235,0.28), 0 1px 0 rgba(255,255,255,0.10) inset",
              }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-white/15 text-[11px] text-center mt-6">
          AlisTech Internal · Admin Only
        </p>
      </motion.div>
    </div>
  );
}
