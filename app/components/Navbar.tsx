"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = document.cookie.includes("user_session") || localStorage.getItem("user_token");
    if (userSession) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <nav className="w-full pt-5 fixed top-0 left-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-6">
            <div className="w-full flex items-center justify-between border border-white/10 bg-black/30 px-6 py-3.5 backdrop-blur-md rounded-2xl shadow-lg">
                <div>
                    <Image
                        src="/logo6.png"
                        alt="Civics Please"
                        height={90}
                        width={180}
                        className="h-auto w-[90px]"
                        priority
                    />
                </div>
                <div className="hidden md:flex gap-8">
                    <Link className="text-sm font-medium text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-white" href="/">Home</Link>
                    <Link className="text-sm font-medium text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-white" href="/#how-it-works">How It Works</Link>
                    <Link className="text-sm font-medium text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-white" href="/features">Features</Link>
                    <Link className="text-sm font-medium text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-white" href="/contact">Contact Us</Link>
                    <Link className="text-sm font-medium text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-white" href="/about">About Us</Link>
                </div>
                <div className="flex items-center gap-5">
                    {!loading && (
                      isLoggedIn ? (
                        <Link 
                          href="/dashboard" 
                          className="text-lg font-medium text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
                        >
                          🏡
                        </Link>
                      ) : (
                        <Link 
                          href="/login" 
                          className="text-sm font-medium text-white/70 transition-all duration-200 hover:text-white"
                        >
                          Login
                        </Link>
                      )
                    )}
                    <Link 
                      className="rounded bg-red-400 px-2 py-1 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.25)]" 
                      href="/report"
                    >
                      Report an Issue
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;