"use client";

import { useState } from "react";
import { loginUser } from "../actions/auth";
import Link from "next/link";
import Navbar from "../components/Navbar";

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
        localStorage.setItem("user_token", result.userId);
        window.dispatchEvent(new Event("auth_changed"));

        if (result.isAdmin) {
          window.location.href = "/admin"; 
        } else {
          window.location.href = "/"; 
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4 sm:px-6 py-8 md:py-16 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 md:mb-8 text-center border-b-2 border-[#113320] pb-6">
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3">
              SECURE LOGIN PORTAL
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#113320] uppercase leading-tight mb-2">
              SIGN IN
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#113320]/70">
              Access citizen portal or municipal authority command center.
            </p>
          </div>

          <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[6px_6px_0px_#113320] sm:shadow-[8px_8px_0px_#113320]">
            
            {/* Quick Demo Fill Banner */}
            <div className="border-2 border-[#113320] bg-[#f4ebd6] p-4 mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#113320]">
                  🔑 DEMO / ADMIN ACCESS
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@civicsplease.gov");
                    setPassword("AdminPassword123@");
                    setErrorMessage("");
                  }}
                  className="border border-[#113320] bg-white px-2 py-1 font-sans text-[10px] font-bold uppercase text-[#fa6355] hover:bg-[#fa6355] hover:text-white transition-colors shadow-[1px_1px_0px_#113320]"
                >
                  Autofill Credentials
                </button>
              </div>
              <p className="font-sans text-[11px] text-[#113320]/80">
                Email: <span className="font-mono font-bold text-[#113320]">admin@civicsplease.gov</span>
                <br />
                Password: <span className="font-mono font-bold text-[#113320]">AdminPassword123@</span>
              </p>
            </div>

            {errorMessage && (
              <div className="border-2 border-[#113320] bg-[#fa6355]/10 p-3 text-center text-xs text-[#fa6355] font-bold mb-6 uppercase">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} action="#" className="space-y-6">
              <div>
                <label className="block font-sans text-xs font-bold text-[#113320] uppercase mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-[#113320] uppercase mb-2">Password *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border-2 border-[#113320] bg-[#fa6355] px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider text-white hover:shadow-retro-lg transition-all disabled:opacity-50"
                >
                  {loading ? "AUTHENTICATING..." : "SIGN IN"}
                </button>
              </div>
            </form>

            <div className="mt-8 border-t-2 border-[#113320]/20 pt-6 text-center">
              <p className="font-sans text-xs text-[#113320]/60 mb-3">Don't have a citizen account yet?</p>
              <Link
                href="/register"
                className="block w-full border-2 border-[#113320] bg-[#f4ebd6] py-3 font-sans text-xs font-bold text-[#113320] uppercase tracking-wider hover:bg-[#e2f9e1] transition-colors shadow-retro"
              >
                Register New Account →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}