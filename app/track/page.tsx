"use client";

import { useState } from "react";
import { getReportByTrackingId } from "../actions/track";

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setReport(null);

    const result = await getReportByTrackingId(trackingId);

    if (result.success && result.report) {
      setReport(result.report);
    } else {
      setErrorMessage(result.error || "Report not found.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050806] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        
        {/* Top status bar */}
        <div className="mb-4 flex items-center justify-between border border-white/[0.08] bg-[#0a0f0c]/90 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">
              CIVICS PLEASE
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/30">
            INCIDENT TRACKING PORTAL
          </span>
        </div>

        {/* Main Card */}
        <div className="border border-green-400/10 bg-[#0b110d] p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">Track Incident Report</h1>
            <p className="mt-1 text-sm text-white/40">
              Enter your tracking reference ID (e.g., CP-2026-XXXXX) to check current municipal review status.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID..."
              required
              className="flex-1 border-b border-white/20 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-green-400 font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="border border-green-400 bg-green-400 px-6 py-3 text-xs font-bold uppercase text-black hover:bg-green-300 transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Track Status"}
            </button>
          </form>

          {errorMessage && (
            <div className="border border-red-500/30 bg-red-500/10 p-4 text-center text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          {report && (
            <div className="mt-6 border border-green-400/20 bg-black/40 p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">Tracking Reference</span>
                  <span className="font-mono text-lg font-bold text-green-400">{report.trackingId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">Current Status</span>
                  <span className="inline-block mt-1 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-green-400/10 text-green-400 border border-green-400/30">
                    {report.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <span className="text-white/40 block mb-1">Category</span>
                  <span className="font-semibold text-white">{report.category}</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-1">Priority Level</span>
                  <span className="font-semibold text-white">{report.priority}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-white/40 block mb-1">Incident Title</span>
                  <span className="font-semibold text-white">{report.title}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-white/40 block mb-1">Description</span>
                  <p className="text-white/80 bg-black/50 p-3 border border-white/10 rounded">{report.description}</p>
                </div>
                {report.address && (
                  <div className="sm:col-span-2">
                    <span className="text-white/40 block mb-1">Location Address</span>
                    <span className="text-white/80">{report.address}</span>
                  </div>
                )}
                <div>
                  <span className="text-white/40 block mb-1">Filed On</span>
                  <span className="text-white/80">{new Date(report.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-white/50 hover:text-green-400 transition">
            ← Return to Home
          </a>
        </div>
      </div>
    </main>
  );
}