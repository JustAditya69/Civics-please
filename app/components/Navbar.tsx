"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutUser } from "../actions/auth";
import { Web3Manager } from "../lib/web3";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("user_token");
      setIsLoggedIn(!!token);
    };

    const checkWeb3 = () => {
      setWalletAddress(Web3Manager.getWalletAddress());
      setTokenBalance(Web3Manager.getCivicTokenBalance());
    };

    checkAuth();
    checkWeb3();

    window.addEventListener("auth_changed", checkAuth);
    window.addEventListener("auth_changed", checkWeb3);
    window.addEventListener("web3_wallet_changed", checkWeb3);
    window.addEventListener("web3_balance_changed", checkWeb3);

    return () => {
      window.removeEventListener("auth_changed", checkAuth);
      window.removeEventListener("auth_changed", checkWeb3);
      window.removeEventListener("web3_wallet_changed", checkWeb3);
      window.removeEventListener("web3_balance_changed", checkWeb3);
    };
  }, []);

  const handleWalletClick = async () => {
    if (walletAddress) {
      if (confirm(`Connected: ${walletAddress}\n$CIVIC Balance: ${tokenBalance}\n\nDo you want to disconnect?`)) {
        Web3Manager.disconnectWallet();
      }
    } else {
      await Web3Manager.connectMetaMask();
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    localStorage.removeItem("user_token");
    await logoutUser();
    window.dispatchEvent(new Event("auth_changed"));
    window.dispatchEvent(new Event("web3_wallet_changed"));
    window.dispatchEvent(new Event("web3_balance_changed"));
    window.location.href = "/";
  };

  return (
    <nav className="w-full border-b-2 border-[#113320] bg-[#e2f9e1] sticky top-0 z-50 shadow-[0_4px_0px_#113320]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="border-2 border-[#113320] bg-white p-1.5 sm:p-2 shadow-[2px_2px_0px_#113320] group-hover:shadow-[4px_4px_0px_#113320] group-hover:-translate-y-0.5 transition-all">
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#fa6355" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <div>
            <h1 className="font-pixel text-[10px] sm:text-[13px] text-[#113320] uppercase leading-tight">Civics Please</h1>
            <p className="font-sans text-[7px] sm:text-[9px] font-bold text-[#113320]/70 uppercase tracking-[0.2em]">City Service Network</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <NavLink href="/" active={pathname === "/"}>Home</NavLink>
          <NavLink href="/#how-it-works" active={false}>How It Works</NavLink>
          <NavLink href="/features" active={pathname === "/features"}>Features</NavLink>
          <NavLink href="/contact" active={pathname === "/contact"}>Contact Us</NavLink>
          <NavLink href="/about" active={pathname === "/about"}>About Us</NavLink>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Web3 Wallet Button */}
          <button
            type="button"
            onClick={handleWalletClick}
            className={`border-2 border-[#113320] px-3 py-1.5 font-sans font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#113320] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 ${
              walletAddress ? "bg-white text-[#113320]" : "bg-[#f4ebd6] text-[#113320] hover:bg-[#fa6355] hover:text-white"
            }`}
          >
            {walletAddress ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-pixel text-[10px] text-[#fa6355]">{tokenBalance} $CIVIC</span>
                <span className="font-mono text-[11px]">{Web3Manager.formatAddress(walletAddress)}</span>
              </>
            ) : (
              <>
                <span>🦊</span>
                <span>CONNECT WEB3</span>
              </>
            )}
          </button>

          {isLoggedIn ? (
            <>
              <NavLink href="/dashboard" active={pathname === "/dashboard"}>Dashboard</NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 border-2 border-transparent text-[#113320] hover:border-[#113320] hover:shadow-retro hover:bg-[#fa6355] hover:text-white hover:-translate-y-0.5 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login" active={pathname === "/login"}>Login</NavLink>
              <NavLink href="/register" active={pathname === "/register"}>Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="border-2 border-[#113320] bg-white px-3 py-1.5 font-pixel text-[10px] text-[#113320] shadow-[2px_2px_0px_#113320] active:translate-y-0.5 transition-all"
          >
            {mobileMenuOpen ? "✕ CLOSE" : "☰ MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#113320] bg-[#e2f9e1] px-4 py-4 space-y-2 shadow-[0_6px_0px_#113320]">
          {/* Mobile Web3 Button */}
          <button
            type="button"
            onClick={handleWalletClick}
            className="w-full border-2 border-[#113320] bg-white px-3 py-2.5 font-sans font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#113320] flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <span>🪙</span>
              <span>Web3 Civic Wallet</span>
            </div>
            {walletAddress ? (
              <span className="font-pixel text-[10px] text-[#fa6355]">{tokenBalance} $CIVIC</span>
            ) : (
              <span className="text-[10px] text-[#fa6355] font-bold">CONNECT</span>
            )}
          </button>

          <div className="flex flex-col gap-1.5">
            <MobileNavLink href="/" active={pathname === "/"} onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/#how-it-works" active={false} onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </MobileNavLink>
            <MobileNavLink href="/features" active={pathname === "/features"} onClick={() => setMobileMenuOpen(false)}>
              Features
            </MobileNavLink>
            <MobileNavLink href="/contact" active={pathname === "/contact"} onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </MobileNavLink>
            <MobileNavLink href="/about" active={pathname === "/about"} onClick={() => setMobileMenuOpen(false)}>
              About Us
            </MobileNavLink>
          </div>

          <div className="pt-3 border-t-2 border-[#113320]/20 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <MobileNavLink href="/dashboard" active={pathname === "/dashboard"} onClick={() => setMobileMenuOpen(false)}>
                  📊 Citizen Dashboard
                </MobileNavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-center font-sans font-bold text-xs uppercase tracking-widest py-3 border-2 border-[#113320] bg-[#fa6355] text-white shadow-retro"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-sans font-bold text-xs uppercase tracking-widest py-3 border-2 border-[#113320] bg-white text-[#113320] shadow-retro"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-sans font-bold text-xs uppercase tracking-widest py-3 border-2 border-[#113320] bg-[#fa6355] text-white shadow-retro"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`font-sans font-bold text-xs uppercase tracking-widest px-3 py-2 border-2 transition-all ${
        active
          ? 'border-[#113320] text-[#fa6355] shadow-retro bg-white'
          : 'border-transparent text-[#113320] hover:border-[#113320] hover:shadow-retro hover:bg-white hover:-translate-y-0.5'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-sans font-bold text-xs uppercase tracking-widest px-4 py-3 border-2 min-h-[44px] flex items-center transition-all ${
        active
          ? 'border-[#113320] text-[#fa6355] bg-white shadow-retro'
          : 'border-[#113320]/20 bg-white/70 text-[#113320] hover:border-[#113320] hover:bg-white'
      }`}
    >
      {children}
    </Link>
  );
}