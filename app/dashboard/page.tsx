"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserReports } from "../actions/user-reports";
import { Web3Manager, ALL_CIVIC_BADGES, CivicBadge } from "../lib/web3";
import Navbar from "../components/Navbar";

export default function UserDashboardPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Web3 State
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [civicBalance, setCivicBalance] = useState<number>(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  useEffect(() => {
    async function loadReports() {
      const result = await getUserReports();
      const currentUid = localStorage.getItem("user_token") || undefined;

      if (result.success && result.reports) {
        setReports(result.reports);
        // Strictly synchronize: exactly 50 $CIVIC points per verified report for THIS user
        const trackingIds = result.reports.map((r: any) => r.trackingId);
        const synced = Web3Manager.syncWithReports(result.reports.length, trackingIds, currentUid);
        setCivicBalance(synced);
        setWalletAddress(Web3Manager.getWalletAddress(currentUid));
        setUnlockedBadges(Web3Manager.getUnlockedBadges(currentUid));
      } else {
        setErrorMessage(result.error || "Please log in to view your dashboard.");
      }
      setLoading(false);
    }
    loadReports();

    // Load Web3 Data for active user
    const currentUid = typeof window !== "undefined" ? localStorage.getItem("user_token") || undefined : undefined;
    setWalletAddress(Web3Manager.getWalletAddress(currentUid));
    setCivicBalance(Web3Manager.getCivicTokenBalance(currentUid));
    setUnlockedBadges(Web3Manager.getUnlockedBadges(currentUid));

    const handleWeb3Change = () => {
      const uid = localStorage.getItem("user_token") || undefined;
      setWalletAddress(Web3Manager.getWalletAddress(uid));
      setCivicBalance(Web3Manager.getCivicTokenBalance(uid));
      setUnlockedBadges(Web3Manager.getUnlockedBadges(uid));
    };

    window.addEventListener("web3_wallet_changed", handleWeb3Change);
    window.addEventListener("web3_balance_changed", handleWeb3Change);
    window.addEventListener("web3_badges_changed", handleWeb3Change);
    window.addEventListener("auth_changed", handleWeb3Change);

    return () => {
      window.removeEventListener("web3_wallet_changed", handleWeb3Change);
      window.removeEventListener("web3_balance_changed", handleWeb3Change);
      window.removeEventListener("web3_badges_changed", handleWeb3Change);
      window.removeEventListener("auth_changed", handleWeb3Change);
    };
  }, []);

  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    const currentUid = localStorage.getItem("user_token") || undefined;
    const res = await Web3Manager.connectMetaMask(currentUid);
    setIsConnectingWallet(false);
    if (!res.success && res.error) {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4 sm:px-6 py-8 md:py-16 flex flex-col items-center">
        
        <div className="w-full max-w-5xl space-y-8">
          {/* Header */}
          <div className="text-center border-b-2 border-[#113320] pb-6 md:pb-8">
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3">
              USER DASHBOARD
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-[#113320] uppercase leading-tight mb-3">
              YOUR SUBMITTED REPORTS
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#113320]/70">
              Monitor the progress, on-chain ledger proof, and resolution status of all your logged civic complaints.
            </p>
          </div>

          {/* Web3 Civic Vault Card */}
          <div className="border-2 border-[#113320] bg-[#e2f9e1] p-6 shadow-[6px_6px_0px_#113320]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#113320]/20 pb-5 mb-6">
              <div>
                <span className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest block mb-1">DECENTRALIZED CIVIC IDENTITY</span>
                <h2 className="font-pixel text-lg sm:text-xl text-[#113320] uppercase">WEB3 CIVIC VAULT</h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {walletAddress ? (
                  <div className="flex items-center gap-2 border-2 border-[#113320] bg-white px-3 py-1.5 font-mono text-xs shadow-[2px_2px_0px_#113320]">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-bold">{Web3Manager.formatAddress(walletAddress)}</span>
                    <span className="bg-[#e2f9e1] border border-[#113320] text-[#113320] text-[8px] font-sans font-bold px-1.5 py-0.5">
                      SEPARATE USER VAULT
                    </span>
                    <button
                      onClick={() => {
                        const uid = localStorage.getItem("user_token") || undefined;
                        Web3Manager.disconnectWallet(uid);
                      }}
                      title="Disconnect wallet"
                      className="ml-1 text-[10px] font-sans font-bold text-red-600 uppercase hover:underline"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConnectWallet}
                    disabled={isConnectingWallet}
                    className="border-2 border-[#113320] bg-[#113320] text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#113320] hover:bg-[#fa6355] transition-colors"
                  >
                    {isConnectingWallet ? "CONNECTING..." : "🦊 CONNECT WEB3 WALLET"}
                  </button>
                )}

                <Link
                  href="/report"
                  className="border-2 border-[#113320] bg-[#fa6355] text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#113320] hover:shadow-[4px_4px_0px_#113320] hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                >
                  <span>+ FILE REPORT</span>
                  <span className="bg-white/20 text-white px-1.5 py-0.5 text-[9px] font-mono font-bold rounded">
                    +50 $CIVIC
                  </span>
                </Link>
              </div>
            </div>

            {/* Token Balance & Karma */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="border-2 border-[#113320] bg-white p-4 shadow-[3px_3px_0px_#113320]">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase">CIVIC TOKEN BALANCE</p>
                  <span className="bg-[#e2f9e1] border border-[#113320] text-[#113320] text-[8px] font-bold px-1.5 py-0.5">
                    50 PTS / REPORT
                  </span>
                </div>
                <p className="font-pixel text-xl sm:text-2xl text-[#fa6355]">{civicBalance} $CIVIC</p>
                <p className="font-sans text-[10px] text-[#113320]/70 mt-1">
                  {reports.length} verified report{reports.length === 1 ? "" : "s"} filed (50 $CIVIC each).
                </p>
              </div>

              <div className="border-2 border-[#113320] bg-white p-4 shadow-[3px_3px_0px_#113320]">
                <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">ON-CHAIN LEDGER STATUS</p>
                <p className="font-pixel text-base sm:text-lg text-[#113320]">POLYGON PoS</p>
                <p className="font-sans text-[10px] text-green-700 font-bold mt-1">✓ Synced & Immutable</p>
              </div>

              <div className="border-2 border-[#113320] bg-white p-4 shadow-[3px_3px_0px_#113320]">
                <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">ACHIEVEMENTS</p>
                <p className="font-pixel text-xl sm:text-2xl text-[#113320]">{unlockedBadges.length} / {ALL_CIVIC_BADGES.length}</p>
                <p className="font-sans text-[10px] text-[#113320]/70 mt-1">Soulbound Civic Badges unlocked.</p>
              </div>
            </div>

            {/* Soulbound Badges Carousel / Gallery */}
            <div>
              <p className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-wider mb-3">
                SOULBOUND CIVIC BADGES (ON-CHAIN REPUTATION)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {ALL_CIVIC_BADGES.map((badge) => {
                  const isUnlocked = unlockedBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`border-2 border-[#113320] p-3 text-center transition-all ${
                        isUnlocked
                          ? "bg-white shadow-[2px_2px_0px_#113320]"
                          : "bg-[#113320]/5 opacity-50 grayscale"
                      }`}
                    >
                      <span className="text-2xl block mb-1">{badge.icon}</span>
                      <p className="font-sans text-[11px] font-bold text-[#113320] leading-tight mb-1">{badge.name}</p>
                      <p className="font-sans text-[9px] text-[#113320]/70 leading-snug line-clamp-2">{badge.description}</p>
                      <span className={`inline-block mt-2 font-mono text-[8px] font-bold uppercase px-1.5 py-0.5 border border-[#113320] ${isUnlocked ? 'bg-[#bce3c5] text-[#113320]' : 'bg-gray-200 text-gray-500'}`}>
                        {isUnlocked ? "UNLOCKED" : "LOCKED"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-2 border-[#113320] bg-white p-4 sm:p-6 md:p-10 shadow-[6px_6px_0px_#113320] md:shadow-[8px_8px_0px_#113320]">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-pixel text-base sm:text-lg text-[#113320] uppercase">INCIDENT QUEUE</h2>
              <a href="/report" className="border-2 border-[#113320] bg-[#fa6355] px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 transition-all">
                + FILE NEW REPORT
              </a>
            </div>

            {loading ? (
              <div className="border-2 border-[#113320] bg-[#f4ebd6] p-12 text-center">
                <span className="font-pixel text-lg text-[#fa6355] animate-pulse">LOADING SECURE DATA...</span>
              </div>
            ) : errorMessage ? (
              <div className="border-2 border-[#113320] bg-[#fa6355]/10 p-6 text-center">
                <p className="font-sans text-sm font-bold text-[#fa6355] uppercase">{errorMessage}</p>
                {errorMessage.includes("log in") && (
                  <a href="/login" className="inline-block mt-4 border-2 border-[#113320] bg-white px-6 py-2 font-sans text-xs font-bold text-[#113320] uppercase shadow-retro">
                    GO TO LOGIN
                  </a>
                )}
              </div>
            ) : reports.length === 0 ? (
              <div className="border-2 border-[#113320] bg-[#e2f9e1] p-12 text-center">
                <p className="font-sans text-sm font-bold text-[#113320] uppercase mb-4">No active missions found.</p>
                <a href="/report" className="font-sans text-xs font-bold text-[#fa6355] hover:text-[#113320] uppercase tracking-widest underline decoration-2 underline-offset-4">
                  Start your first side quest
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border-2 border-[#113320]">
                  <thead className="bg-[#f4ebd6]">
                    <tr className="border-b-2 border-[#113320] font-sans text-xs font-bold text-[#113320] uppercase tracking-wider">
                      <th className="py-4 px-4 border-r-2 border-[#113320]">Tracking ID</th>
                      <th className="py-4 px-4 border-r-2 border-[#113320]">Category</th>
                      <th className="py-4 px-4 border-r-2 border-[#113320]">Title</th>
                      <th className="py-4 px-4 border-r-2 border-[#113320]">Priority</th>
                      <th className="py-4 px-4 border-r-2 border-[#113320]">Status</th>
                      <th className="py-4 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {reports.map((report, idx) => (
                      <tr key={report.id} className={`border-b-2 border-[#113320] font-sans text-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-[#e2f9e1]'}`}>
                        <td className="py-4 px-4 border-r-2 border-[#113320] font-mono font-bold text-[#fa6355]">
                          <a href={`/track?id=${report.trackingId}`} className="hover:underline">{report.trackingId}</a>
                        </td>
                        <td className="py-4 px-4 border-r-2 border-[#113320] text-[#113320] font-bold">{report.category}</td>
                        <td className="py-4 px-4 border-r-2 border-[#113320] text-[#113320] truncate max-w-[200px]">{report.title}</td>
                        <td className="py-4 px-4 border-r-2 border-[#113320]">
                          <span className={`inline-block border-2 border-[#113320] px-2 py-1 text-[10px] uppercase font-bold tracking-wider ${
                            report.priority === "Critical" || report.priority === "High" ? "bg-[#fa6355] text-white" : "bg-white text-[#113320]"
                          }`}>
                            {report.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4 border-r-2 border-[#113320]">
                          <span className="font-mono text-xs font-bold text-[#113320] uppercase">
                            {report.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[#113320]/70 font-mono text-xs">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}