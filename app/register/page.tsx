"use client";

import { useState } from "react";
import { registerUser } from "../actions/auth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Call the database-connected server action
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        alert("Account created and saved to Supabase! An official verification email has been sent.");
        window.location.href = "/login"; 
      } else {
        alert(result.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050806] px-4 py-12 text-white sm:px-6 lg:px-8 flex items-center justify-center">
      
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-200px] top-[10%] h-[500px] w-[500px] rounded-full bg-green-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        
        {/* TOP SYSTEM BAR */}
        <div className="mb-4 flex items-center justify-between border border-white/[0.08] bg-[#0a0f0c]/90 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">
              CIVICS PLEASE
            </span>
          </div>
          <span className="hidden text-[10px] tracking-[0.2em] text-white/25 sm:block">
            NEW CITIZEN ENROLLMENT
          </span>
        </div>

        {/* DOCUMENT CONTAINER */}
        <div className="relative overflow-hidden border border-green-400/10 bg-[#0b110d] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          
          {/* Subtle document texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, white 1px, transparent 1px),
                radial-gradient(circle at 70% 60%, white 1px, transparent 1px)
              `,
              backgroundSize: "17px 17px",
            }}
          />

          <div className="relative z-10 p-6 sm:p-10 lg:p-14">
            
            {/* HEADER */}
            <div className="border-b border-white/10 pb-8 text-center sm:text-left">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center border border-green-400/30 bg-green-400/[0.04]">
                    <span className="text-2xl">🏛</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold tracking-tight text-white">
                      Civics <span className="text-green-400">Please</span>
                    </p>
                    <p className="mt-1 text-[9px] font-medium tracking-[0.25em] text-white/30">
                      CITIZEN PORTAL
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Citizen Registration
                </h1>
                <p className="mt-2 text-sm text-white/40">
                  Create an account to securely save and track your civic reports in the database.
                </p>
              </div>
            </div>

            {/* REGISTER FORM */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First and Last Name"
                    className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-green-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-green-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-3 border border-green-400 bg-green-400 px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-green-300 disabled:opacity-70"
                >
                  {isLoading ? "Saving to Database..." : "Complete Registration"}
                  {!isLoading && <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
                </button>
              </div>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <p className="text-xs text-white/40">
                Already have an account?{" "}
                <a href="/login" className="font-semibold tracking-wide text-green-400 hover:text-green-300 transition-colors">
                  ACCESS PORTAL
                </a>
              </p>
            </div>

          </div>
        </div>
        
        {/* Bottom system information */}
        <div className="flex justify-between px-2 pt-4 text-[9px] uppercase tracking-widest text-white/20">
          <span>Civics Please Authentication</span>
          <span></span>
        </div>

      </div>
    </main>
  );
}