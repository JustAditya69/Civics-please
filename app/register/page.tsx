"use client";

import { useState } from "react";
import { registerUser } from "../actions/auth";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        alert("Account created! You can now log in.");
        window.location.href = "/login"; 
      } else {
        setErrorMessage(result.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4 sm:px-6 py-8 md:py-16 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-6 md:mb-8 text-center border-b-2 border-[#113320] pb-6">
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3">
              NEW CITIZEN ENROLLMENT
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#113320] uppercase leading-tight mb-2">
              REGISTER
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#113320]/70">
              Create an account to securely save and track your civic reports in the database.
            </p>
          </div>

          <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[6px_6px_0px_#113320] sm:shadow-[8px_8px_0px_#113320]">
            
            {errorMessage && (
              <div className="border-2 border-[#113320] bg-[#fa6355]/10 p-3 text-center text-xs text-[#fa6355] font-bold mb-6 uppercase">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs font-bold text-[#113320] uppercase mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First Last"
                    className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-bold text-[#113320] uppercase mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs font-bold text-[#113320] uppercase mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-bold text-[#113320] uppercase mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full border-2 border-[#113320] bg-[#fa6355] px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider text-white hover:shadow-retro-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? "SAVING TO DATABASE..." : "COMPLETE REGISTRATION"}
                </button>
              </div>
            </form>

            <div className="mt-8 border-t-2 border-[#113320]/20 pt-6 text-center">
              <p className="font-sans text-xs text-[#113320]/60 mb-3">Already have an account?</p>
              <Link
                href="/login"
                className="block w-full border-2 border-[#113320] bg-[#f4ebd6] py-3 font-sans text-xs font-bold text-[#113320] uppercase tracking-wider hover:bg-[#e2f9e1] transition-colors shadow-retro"
              >
                ACCESS PORTAL →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}