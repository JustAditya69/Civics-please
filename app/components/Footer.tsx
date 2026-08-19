"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("user_token");
      if (token) {
        setIsLoggedIn(true);
        // Check if it's an admin token or if your admin logic applies
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

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.dispatchEvent(new Event("auth_changed"));
    window.location.href = "/login";
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-black">
      <div className="mx-auto w-full max-w-7xl px-6">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logo1.png"
              alt="Civics Please"
              width={180}
              height={90}
              className="h-auto w-[150px]"
            />

            <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
              Making it easier for citizens to report problems,
              track progress, and help build better communities.
            </p>

            <Link
              href="/report"
              className="mt-7 inline-flex border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              Report an Issue
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-white/30">
              PLATFORM
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/#how-it-works"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                How It Works
              </Link>

              <Link
                href="/features"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                Features
              </Link>

              <Link
                href="/#categories"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                Categories
              </Link>

              <Link
                href="/#impact"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                Our Impact
              </Link>

              <Link
                href="/#transparency"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                Transparency
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-white/30">
              COMPANY
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/about"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                Contact
              </Link>

              {/* Dynamic Authentication Link */}
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="w-fit text-sm text-red-400 font-semibold transition hover:text-red-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-fit text-sm text-white/50 transition hover:text-white text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="w-fit text-sm text-white/50 transition hover:text-white"
                >
                  Login
                </Link>
              )}

              <Link
                href="/privacy"
                className="w-fit text-sm text-white/50 transition hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © 2026 Civics Please. Built for better communities.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;