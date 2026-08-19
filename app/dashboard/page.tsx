"use client";

import { useEffect, useState } from "react";
import { getUserReports } from "../actions/user-reports";

export default function UserDashboardPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadReports() {
      // Retrieve the user token / ID stored in localStorage during login
      const userId = localStorage.getItem("user_token");

      if (!userId) {
        setErrorMessage("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      // Pass the userId into the server action
      const result = await getUserReports(userId);
      if (result.success && result.reports) {
        setReports(result.reports);
      } else {
        setErrorMessage(result.error || "Could not load reports.");
      }
      setLoading(false);
    }
    loadReports();
  }, []);

  const handleLogout = () => {
    // Clear user token from localStorage and redirect to home
    localStorage.removeItem("user_token");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[#050806] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6 pt-10">
        
        {/* Top Status Bar with Log Out Button */}
        <div className="flex items-center justify-between border border-white/[0.08] bg-[#0a0f0c]/90 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">CIVICS PLEASE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.2em] text-white/30 hidden sm:inline">USER DASHBOARD</span>
            <button
              onClick={handleLogout}
              className="border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Reports Container */}
        <div className="border border-green-400/10 bg-[#0b110d] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Your Submitted Reports</h1>
              <p className="mt-1 text-sm text-white/40">Monitor the progress and resolution status of all your logged civic complaints.</p>
            </div>
            <a href="/report" className="border border-green-400 bg-green-400 px-4 py-2 text-xs font-bold uppercase text-black hover:bg-green-300 transition">
              + File New Report
            </a>
          </div>

          {loading ? (
            <p className="text-center text-sm text-white/40 py-12">Loading your reports from database...</p>
          ) : errorMessage ? (
            <div className="border border-red-500/30 bg-red-500/10 p-4 text-center text-xs text-red-400">
              {errorMessage}
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-16 space-y-3 border border-white/5 bg-black/20">
              <p className="text-sm text-white/50">You haven't filed any incident reports yet.</p>
              <a href="/report" className="text-xs text-green-400 underline underline-offset-4">File your first report now</a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider">
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-4 font-mono text-green-400 font-bold">{report.trackingId}</td>
                      <td className="py-4 px-4 text-white/80">{report.category}</td>
                      <td className="py-4 px-4 text-white font-medium">{report.title}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider ${report.priority === "Critical" || report.priority === "High" ? "bg-red-500/10 text-red-400 border border-red-500/30" : "bg-green-400/10 text-green-400 border border-green-400/30"}`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-white/90 bg-black/40 px-2 py-1 border border-white/10">
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/50">{new Date(report.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="text-center">
          <a href="/" className="text-xs text-white/50 hover:text-green-400 transition">← Return to Home</a>
        </div>
      </div>
    </main>
  );
}