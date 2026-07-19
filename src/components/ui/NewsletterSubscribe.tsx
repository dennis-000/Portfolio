"use client";

import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error occurred. Please check your connection.");
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-md p-6 sm:p-8 mt-12 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h3 className="text-lg font-bold font-display text-white mb-2">
          Subscribe to my Newsletter
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 max-w-lg mx-auto">
          Get notified when I publish new case studies, deep dives on AI systems, design templates, and tech startup resources. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Check size={16} />
            </div>
            <p className="text-xs font-bold text-emerald-400">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 px-4 py-2.5 bg-black/45 border border-white/15 rounded-xl text-xs text-white placeholder:text-gray-500 outline-none focus:border-rose-500/40 focus:ring-0 disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/15 ${
                  status === "loading" ? "opacity-55 cursor-not-allowed" : ""
                }`}
              >
                <Send size={11} className={status === "loading" ? "animate-bounce" : ""} />
                <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              </button>
            </div>

            {status === "error" && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-rose-400 animate-fade-in">
                <AlertCircle size={12} />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
