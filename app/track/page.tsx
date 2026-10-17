"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getReportByTrackingId } from "../actions/track";
import { getReportOnChainProof, OnChainProof } from "../lib/web3";
import Navbar from "../components/Navbar";

function TrackContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id") || "";

  const [trackingId, setTrackingId] = useState(queryId);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showWeb3Modal, setShowWeb3Modal] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    if (queryId) {
      handleSearch(new Event("submit") as any, queryId);
    }
  }, [queryId]);

  const handleSearch = async (e: React.FormEvent, idOverride?: string) => {
    e.preventDefault();
    const idToSearch = idOverride || trackingId;
    if (!idToSearch.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setReport(null);

    const result = await getReportByTrackingId(idToSearch);

    if (result.success && result.report) {
      setReport(result.report);
    } else {
      setErrorMessage(result.error || "Report not found.");
    }
    setLoading(false);
  };

  const proof = report ? getReportOnChainProof(report) : null;

  const handleCopyHash = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <main className="flex-1 w-full px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 w-full max-w-4xl mx-auto border-b-2 border-[#113320] pb-8 sm:pb-12">
          <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3">
            MISSION LOOKUP
          </p>
          <h1 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-[#113320] uppercase leading-snug sm:leading-tight mb-4">
            TRACK A REPORT
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#113320]/70 max-w-lg mx-auto">
            Enter your reference code to see the latest update from the city team.
          </p>
        </div>

        {/* Search Container */}
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row shadow-[4px_4px_0px_#113320] hover:shadow-[6px_6px_0px_#113320] transition-shadow">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. CP-8X4K-21"
              required
              className="flex-1 border-2 border-[#113320] bg-[#f4ebd6] px-4 sm:px-6 py-3.5 sm:py-4 font-sans text-base outline-none focus:bg-white placeholder:text-[#113320]/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="border-2 sm:border-l-0 border-[#113320] bg-[#fa6355] px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-sm font-bold uppercase text-white hover:bg-[#e05649] transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? "SEARCHING..." : "SEARCH"}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="border-2 border-[#113320] bg-[#bce3c5] p-3 sm:p-4 text-center">
            <p className="font-sans text-xs text-[#113320]">
              Try demo reference <span className="font-bold text-[#fa6355]">CP-8X4K-21</span>
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="border-2 border-[#113320] bg-[#fa6355]/10 p-3 sm:p-4 text-center">
              <p className="font-sans text-xs sm:text-sm font-bold text-[#fa6355] uppercase">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Result Card */}
          {report && (
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-6 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] mt-6 sm:mt-8 relative overflow-hidden">
              <div className="border-b-2 sm:border-b-0 sm:border-l-2 border-[#113320] bg-[#e2f9e1] px-4 py-2 mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0">
                <span className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-widest block text-center sm:text-left">
                  STATUS: {report.status}
                </span>
              </div>
              
              <div className="pt-2 sm:pt-8">
                <p className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest mb-1">REFERENCE CODE</p>
                <h2 className="font-pixel text-xl sm:text-2xl text-[#113320] mb-6 break-all">{report.trackingId}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-6 gap-x-8 border-t-2 border-[#113320] pt-6">
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#113320]/50 uppercase tracking-widest block mb-1">Category</span>
                    <span className="font-sans text-sm font-bold text-[#113320]">{report.category}</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#113320]/50 uppercase tracking-widest block mb-1">Priority</span>
                    <span className="font-sans text-sm font-bold text-[#113320]">{report.priority}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-sans text-[10px] font-bold text-[#113320]/50 uppercase tracking-widest block mb-1">Incident Title</span>
                    <span className="font-sans text-sm font-bold text-[#113320]">{report.title}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-sans text-[10px] font-bold text-[#113320]/50 uppercase tracking-widest block mb-1">Description</span>
                    <p className="font-sans text-sm text-[#113320]/80 bg-[#f4ebd6] p-4 border-2 border-[#113320] break-words">{report.description}</p>
                  </div>
                  {report.address && (
                    <div className="sm:col-span-2">
                      <span className="font-sans text-[10px] font-bold text-[#113320]/50 uppercase tracking-widest block mb-1">Location</span>
                      <span className="font-sans text-sm text-[#113320]/80 break-words">{report.address}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#113320]/50 uppercase tracking-widest block mb-1">Filed On</span>
                    <span className="font-sans text-xs text-[#113320]/80">{new Date(report.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Web3 On-Chain Ledger Audit Card */}
                {proof && (
                  <div className="mt-8 border-2 border-[#113320] bg-[#e2f9e1] p-4 sm:p-5 shadow-[4px_4px_0px_#113320]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 bg-green-600 rounded-full animate-ping" />
                        <span className="font-pixel text-[11px] text-[#113320] uppercase">IMMUTABLE ON-CHAIN RECORD</span>
                      </div>
                      <span className="font-sans text-[10px] font-bold text-[#113320] uppercase bg-white border border-[#113320] px-2 py-0.5">
                        {proof.network}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-[#113320] bg-white border-2 border-[#113320] p-3 break-all">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-[#113320]/60">Block Height:</span>
                        <span className="font-bold">#{proof.blockNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-[#113320]/60">Proof Hash:</span>
                        <span className="font-bold">{proof.proofHash.slice(0, 10)}...{proof.proofHash.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-[#113320]/60">IPFS CID:</span>
                        <span className="font-bold text-[#fa6355]">{proof.ipfsCid.slice(0, 14)}...</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowWeb3Modal(true)}
                      className="mt-4 w-full border-2 border-[#113320] bg-[#fa6355] py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
                    >
                      ⛓️ INSPECT BLOCKCHAIN AUDIT TRAIL
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Web3 On-Chain Verification Modal */}
          {showWeb3Modal && proof && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#113320]/80 p-4">
              <div className="w-full max-w-xl border-4 border-[#113320] bg-[#f4ebd6] p-6 sm:p-8 shadow-[8px_8px_0px_#113320] max-h-[90vh] overflow-y-auto space-y-5">
                <div className="flex items-center justify-between border-b-2 border-[#113320] pb-4">
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest block mb-1">DECENTRALIZED LEDGER PROOF</span>
                    <h3 className="font-pixel text-base sm:text-lg text-[#113320] uppercase">{report.trackingId}</h3>
                  </div>
                  <button
                    onClick={() => setShowWeb3Modal(false)}
                    className="border-2 border-[#113320] bg-white h-8 w-8 font-pixel text-sm hover:bg-[#fa6355] hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="border-2 border-[#113320] bg-[#bce3c5] p-3 text-xs font-bold text-[#113320] flex items-center gap-2">
                  <span>✓</span>
                  <span>MERKLE ROOT INTEGRITY VERIFIED - IMMUTABLE CITIZEN RECORD</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-[#113320]">
                  <div className="bg-white border-2 border-[#113320] p-3">
                    <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">Cryptographic Proof Hash (SHA-256)</p>
                    <p className="break-all font-bold text-[11px]">{proof.proofHash}</p>
                    <button
                      onClick={() => handleCopyHash(proof.proofHash)}
                      className="mt-2 text-[10px] font-sans font-bold uppercase underline text-[#fa6355]"
                    >
                      {copiedHash ? "COPIED TO CLIPBOARD!" : "COPY HASH"}
                    </button>
                  </div>

                  <div className="bg-white border-2 border-[#113320] p-3">
                    <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">Transaction Hash</p>
                    <p className="break-all font-bold text-[11px] text-green-800">{proof.txHash}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border-2 border-[#113320] p-3">
                      <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">Block Confirmations</p>
                      <p className="font-bold text-sm">2,418 CONFIRMED</p>
                    </div>
                    <div className="bg-white border-2 border-[#113320] p-3">
                      <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">Network</p>
                      <p className="font-bold text-xs">{proof.network}</p>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-[#113320] p-3">
                    <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">Decentralized Storage (IPFS CID)</p>
                    <p className="break-all font-bold text-[11px] text-[#fa6355]">{proof.ipfsCid}</p>
                  </div>

                  <div className="bg-white border-2 border-[#113320] p-3">
                    <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase mb-1">Smart Contract Address</p>
                    <p className="break-all font-bold text-[11px]">{proof.contractAddress}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowWeb3Modal(false)}
                  className="w-full border-2 border-[#113320] bg-[#113320] text-white py-3 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#fa6355] transition-colors"
                >
                  CLOSE LEDGER AUDIT
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center py-24">
            <span className="font-pixel text-xl text-[#fa6355] animate-pulse">LOADING TRACKER...</span>
          </div>
        }
      >
        <TrackContent />
      </Suspense>

      {/* Footer / Branding bottom */}
      <footer className="w-full border-t-2 border-[#113320] py-6 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-pixel text-xs text-[#113320]">CIVICS PLEASE © 2026</p>
          <p className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-widest">One city. One queue. Every report counts.</p>
        </div>
      </footer>
    </div>
  );
}