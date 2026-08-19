"use client";

import { useState } from "react";
import { loginUser } from "../actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const result = await loginUser({ email, password });

      if (result.success && result.userId) {
        // Save the user ID or token to localStorage
        localStorage.setItem("user_token", result.userId);

        // DISPATCH EVENT SO FOOTER/NAVBAR UPDATES INSTANTLY
        window.dispatchEvent(new Event("auth_changed"));

        // Check if authenticated account is admin
        if (result.isAdmin) {
          window.location.href = "/admin"; // Route admin to command center
        } else {
          window.location.href = "/"; // Route regular citizen to landing page
        }
      } else {
        setErrorMessage(result.error || "Invalid credentials.");
        setLoading(false);
      }
    } catch (err) {
      setErrorMessage("Network error during login.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050806] px-4 py-12 text-white flex items-center justify-center">
      <div className="mx-auto max-w-md w-full">
        
        <div className="mb-4 flex items-center justify-between border border-white/[0.08] bg-[#0a0f0c]/90 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">CIVICS PLEASE</span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/30">SECURE LOGIN PORTAL</span>
        </div>

        <div className="border border-green-400/10 bg-[#0b110d] p-8 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">Sign In</h1>
            <p className="mt-1 text-xs text-white/40">
              Access citizen portal or municipal authority command center.
            </p>
          </div>

          {errorMessage && (
            <div className="border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya@example.com"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-2">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400"
              />
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-green-400 bg-green-400 py-4 text-xs font-semibold text-black transition-all hover:bg-green-300 disabled:opacity-50 uppercase tracking-wider"
              >
                {loading ? "Authenticating..." : "Sign In to Portal"}
              </button>
            </div>
          </form>

          <div className="border-t border-white/10 pt-6 text-center space-y-3">
            <p className="text-xs text-white/40">Don't have a citizen account yet?</p>
            <Link
              href="/register"
              className="block w-full border border-white/20 bg-transparent py-3 text-xs font-semibold text-white uppercase tracking-wider hover:border-green-400 hover:text-green-400 transition"
            >
              Register New Account →
            </Link>
          </div>

        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-white/40 hover:text-green-400 transition">
            ← Return to Home
          </Link>
        </div>

      </div>
    </main>
  );
}