"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to admin index
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Login Card */}
      <div className="w-full max-w-md glass-strong border border-[var(--border)] rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/15 border border-[#6366f1]/35 flex items-center justify-center mb-4 text-[#6366f1] shadow-lg shadow-indigo-500/10">
            <Lock size={20} className="animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide font-display text-white">
            Security Gateway
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-[280px]">
            Enter authentication passkey to unlock Dennis portfolio CMS operations.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              System Passkey
            </label>
            <div className="relative flex items-center">
              <KeyRound size={16} className="absolute left-4 text-[var(--text-muted)]" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-[var(--border)] focus:border-[#6366f1]/60 focus:ring-0 outline-none text-sm text-white font-mono placeholder-white/10 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs leading-relaxed">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm tracking-wide text-white transition-all cursor-pointer ${
              isLoading || !password
                ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                : "bg-[#6366f1] border border-[#6366f1]/40 hover:opacity-95 hover:scale-[1.01] active:scale-100 shadow-lg shadow-indigo-500/20"
            }`}
          >
            <span>{isLoading ? "Authenticating..." : "Unlock Console"}</span>
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>

        <div className="mt-8 border-t border-[var(--border)]/60 pt-5 text-center flex items-center justify-center gap-2">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span className="text-[10px] text-[var(--text-muted)] font-medium">
            Session encrypted. Authorized access only.
          </span>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-[10px] text-[var(--text-muted)] hover:text-[#6366f1] transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
