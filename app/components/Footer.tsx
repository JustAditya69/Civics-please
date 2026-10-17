"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("user_token");
      if (token) {
        setIsLoggedIn(true);
        if (token === "ADMIN_ROOT_USER") {
          setIsAdmin(true);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth_changed", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth_changed", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error("Logout error:", e);
    }
    localStorage.removeItem("user_token");
    window.dispatchEvent(new Event("auth_changed"));
    window.location.href = "/login";
  };

  return (
    <footer className="relative w-full border-t-4 border-[#113320] bg-[#e2f9e1] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-10 md:py-16 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <div className="border-2 border-[#113320] bg-white p-2 shadow-[2px_2px_0px_#113320] group-hover:shadow-[4px_4px_0px_#113320] transition-shadow">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fa6355" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h1 className="font-pixel text-[13px] md:text-base text-[#113320] uppercase leading-tight mb-1">Civics Please</h1>
                <p className="font-sans text-[9px] md:text-[10px] font-bold text-[#113320]/70 uppercase tracking-[0.2em]">City Service Network</p>
              </div>
            </Link>

            <p className="max-w-sm font-sans text-sm leading-relaxed text-[#113320]/80">
              Making it easier for citizens to report problems, track progress, and help build better communities.
            </p>

            <Link
              href="/report"
              className="mt-8 border-2 border-[#113320] bg-[#fa6355] px-6 py-3 font-sans text-sm font-bold text-white uppercase tracking-wider shadow-retro hover:shadow-retro-lg transition-all inline-block"
            >
              Report an Issue →
            </Link>
          </div>

          {/* Platform */}
          <div>
            <p className="font-pixel text-[10px] text-[#fa6355] uppercase tracking-widest mb-6">
              PLATFORM
            </p>
            <div className="flex flex-col gap-4 font-sans text-sm font-bold text-[#113320] uppercase">
              <Link href="/#how-it-works" className="w-fit hover:text-[#fa6355] transition-colors">How It Works</Link>
              <Link href="/features" className="w-fit hover:text-[#fa6355] transition-colors">Features</Link>
              <Link href="/#categories" className="w-fit hover:text-[#fa6355] transition-colors">Categories</Link>
              <Link href="/#impact" className="w-fit hover:text-[#fa6355] transition-colors">Our Impact</Link>
              <Link href="/#transparency" className="w-fit hover:text-[#fa6355] transition-colors">Transparency</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="font-pixel text-[10px] text-[#fa6355] uppercase tracking-widest mb-6">
              COMPANY
            </p>
            <div className="flex flex-col gap-4 font-sans text-sm font-bold text-[#113320] uppercase">
              <Link href="/about" className="w-fit hover:text-[#fa6355] transition-colors">About Us</Link>
              <Link href="/contact" className="w-fit hover:text-[#fa6355] transition-colors">Contact</Link>
              
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="w-fit text-green-700 hover:text-green-600 transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-fit text-left hover:text-[#fa6355] transition-colors uppercase">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="w-fit hover:text-[#fa6355] transition-colors">Login</Link>
              )}
              
              <Link href="/privacy" className="w-fit hover:text-[#fa6355] transition-colors">Privacy Policy</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-[#113320] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-pixel text-xs text-[#113320]">CIVICS PLEASE © 2026</p>
          <p className="font-sans text-[10px] font-bold text-[#113320]/70 uppercase tracking-widest">Built for better communities.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;