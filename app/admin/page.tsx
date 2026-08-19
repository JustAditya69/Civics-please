"use client";

import { useEffect, useState } from "react";
import { 
  getAllAdminReports, 
  updateReportStatus, 
  dispatchToAuthority,
  getAdminQueries,
  updateQueryStatus 
} from "../actions/admin";

// Dummy authority departments for the dropdown
const AUTHORITIES = [
  { name: "Public Works Department (Roads)", email: "pwd@civicsplease.gov" },
  { name: "Sanitation & Waste Management", email: "sanitation@civicsplease.gov" },
  { name: "Water Board & Drainage", email: "water@civicsplease.gov" },
  { name: "Electrical & Street Lights", email: "electrical@civicsplease.gov" },
  { name: "Traffic Police Division", email: "traffic@civicsplease.gov" },
];

export default function AdminDashboardPage() {
  // Existing state for Reports
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  
  // Modal States
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedAuthority, setSelectedAuthority] = useState("");
  const [isDispatching, setIsDispatching] = useState(false);

  // NEW: State for Queries & Tabs
  const [activeTab, setActiveTab] = useState<"REPORTS" | "QUERIES">("REPORTS");
  const [queries, setQueries] = useState<any[]>([]);
  const [loadingQueries, setLoadingQueries] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token !== "ADMIN_ROOT_USER") {
      window.location.href = "/login";
      return;
    }

    async function fetchReports() {
      const result = await getAllAdminReports();
      if (result.success && result.reports) setReports(result.reports);
      setLoading(false);
    }

    // NEW: Fetch queries
    async function fetchQueries() {
      setLoadingQueries(true);
      const result = await getAdminQueries();
      if (result.success && result.queries) setQueries(result.queries);
      setLoadingQueries(false);
    }

    fetchReports();
    fetchQueries();
  }, []);

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    const res = await updateReportStatus(reportId, newStatus);
    if (res.success) {
      setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r)));
      if (selectedReport && selectedReport.id === reportId) {
        setSelectedReport({ ...selectedReport, status: newStatus });
      }
      setActionMessage(`Status updated to ${newStatus.replace("_", " ")}`);
      setTimeout(() => setActionMessage(""), 3500);
    }
  };

  const handleDispatch = async () => {
    if (!selectedAuthority || !selectedReport) return;
    setIsDispatching(true);

    const authorityName = AUTHORITIES.find(a => a.email === selectedAuthority)?.name || "Authority";
    
    const res = await dispatchToAuthority(selectedReport.id, selectedAuthority, authorityName);
    
    if (res.success) {
      setReports((prev) => prev.map((r) => (r.id === selectedReport.id ? { ...r, status: "IN_PROGRESS" } : r)));
      setSelectedReport(null);
      setActionMessage(`Successfully dispatched ${selectedReport.trackingId} to ${authorityName}`);
      setTimeout(() => setActionMessage(""), 4000);
    } else {
      alert("Failed to dispatch report. Check server logs.");
    }
    setIsDispatching(false);
  };

  // NEW: Handle Query Status Change
  const handleQueryStatus = async (queryId: string, newStatus: string) => {
    const res = await updateQueryStatus(queryId, newStatus);
    if (res.success) {
      setQueries((prev) => prev.map((q) => (q.id === queryId ? { ...q, status: newStatus } : q)));
      setActionMessage(`Query marked as ${newStatus}`);
      setTimeout(() => setActionMessage(""), 3000);
    } else {
      alert("Failed to update query status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.location.href = "/login";
  };

  const activeReports = reports.filter((r) => r.status !== "RESOLVED");
  const filteredReports = activeReports.filter((r) => {
    const matchesStatus = filterStatus === "ALL" || r.status === filterStatus;
    const matchesSearch = 
      r.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#050806] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 relative">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-red-500/20 bg-[#0a0f0c] px-6 py-4 gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-red-400 block font-bold">SECURE MUNICIPAL GRID</span>
              <h1 className="text-sm font-mono tracking-wider text-white">CIVICS PLEASE // AUTHORITY COMMAND</h1>
            </div>
          </div>
          <button onClick={handleLogout} className="border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition">
            Terminate Session
          </button>
        </div>

        {actionMessage && (
          <div className="border border-green-500/30 bg-green-500/10 p-3 text-xs font-mono text-green-400 animate-fade-in">
            [SYSTEM] {actionMessage}
          </div>
        )}

        {/* TABS FOR NAVIGATION */}
        <div className="flex gap-6 border-b border-white/10 pb-2">
          <button 
            onClick={() => setActiveTab("REPORTS")}
            className={`text-xs font-mono font-bold uppercase tracking-widest pb-2 transition-colors ${
              activeTab === "REPORTS" ? "text-red-400 border-b-2 border-red-400" : "text-white/40 hover:text-white"
            }`}
          >
            Incident Reports
          </button>
          <button 
            onClick={() => setActiveTab("QUERIES")}
            className={`text-xs font-mono font-bold uppercase tracking-widest pb-2 transition-colors ${
              activeTab === "QUERIES" ? "text-red-400 border-b-2 border-red-400" : "text-white/40 hover:text-white"
            }`}
          >
            Support Queries
          </button>
        </div>

        {/* ================= REPORTS TAB VIEW ================= */}
        {activeTab === "REPORTS" && (
          <div className="border border-red-500/15 bg-[#0b110d] p-6 shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white font-mono">Active Incident Dispatch Ledger</h2>
              </div>
              <input
                type="text"
                placeholder="Search Tracking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-72 border border-white/20 bg-black/50 px-3 py-2 text-xs font-mono text-white outline-none focus:border-red-400"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {["ALL", "AWAITING_REVIEW", "IN_PROGRESS"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition ${
                    filterStatus === status ? "bg-red-500 text-black border border-red-500" : "border border-white/10 bg-black/40 text-white/60 hover:border-white/30"
                  }`}
                >
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-center font-mono text-xs text-white/40 py-16">Syncing database...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Tracking ID</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Priority</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-4 px-4 text-red-400 font-bold">{report.trackingId}</td>
                        <td className="py-4 px-4 text-white/80">{report.category}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider ${
                            report.priority === "Critical" || report.priority === "High" ? "bg-red-500/10 text-red-400 border border-red-500/30" : "bg-green-400/10 text-green-400 border border-green-400/30"
                          }`}>
                            {report.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={report.status}
                            onChange={(e) => handleStatusChange(report.id, e.target.value)}
                            className="bg-black border border-white/20 text-white px-2 py-1 text-[10px] outline-none"
                          >
                            <option value="AWAITING_REVIEW">Awaiting</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <button 
                            onClick={() => setSelectedReport(report)}
                            className="border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] hover:bg-white/10 hover:border-white/40 transition text-white uppercase tracking-wider"
                          >
                            View Data
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= QUERIES TAB VIEW ================= */}
        {activeTab === "QUERIES" && (
          <div className="border border-red-500/15 bg-[#0b110d] p-6 shadow-2xl space-y-6">
            <h2 className="text-lg font-bold tracking-tight text-white font-mono border-b border-white/10 pb-4">
              Incoming Support Transmissions
            </h2>
            
            {loadingQueries ? (
              <p className="text-center font-mono text-xs text-white/40 py-16">Decrypting messages...</p>
            ) : queries.length === 0 ? (
              <p className="text-center font-mono text-xs text-white/40 py-16">No support queries found.</p>
            ) : (
              <div className="space-y-4">
                {queries.map((query) => (
                  <div key={query.id} className="border border-white/10 bg-black p-5 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${query.status === "UNREAD" ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                        <h3 className="text-sm font-bold text-white">{query.subject}</h3>
                      </div>
                      
                      <div className="flex flex-col text-xs font-mono text-white/50">
                        <span>Citizen: {query.name}</span>
                        <span>Comm Link: {query.email}</span>
                        <span>Date: {new Date(query.createdAt).toLocaleString()}</span>
                      </div>
                      
                      <div className="p-4 bg-white/[0.02] border border-white/5 mt-2 text-sm text-white/80 leading-relaxed font-sans">
                        {query.message}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[150px] justify-start pt-2">
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-mono mb-1 block">Status</label>
                        <select
                          value={query.status}
                          onChange={(e) => handleQueryStatus(query.id, e.target.value)}
                          className="w-full bg-black border border-white/20 text-white px-3 py-2 text-[10px] outline-none font-mono uppercase focus:border-red-400"
                        >
                          <option value="UNREAD">Unread</option>
                          <option value="READ">Read</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                      </div>
                      
                      <a 
                        href={`mailto:${query.email}?subject=Re: ${query.subject}`} 
                        className="text-center border border-white/20 bg-white/5 px-3 py-2 text-[10px] hover:bg-white/10 hover:border-white/40 transition text-white uppercase tracking-wider font-mono mt-auto"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DETAILED REPORT MODAL */}
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl border border-red-500/30 bg-[#0a0f0c] shadow-2xl flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-white/10 p-4 bg-black">
                <div>
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block">INCIDENT DOSSIER</span>
                  <h3 className="text-lg font-bold text-white font-mono">{selectedReport.trackingId}</h3>
                </div>
                <button onClick={() => setSelectedReport(null)} className="text-white/50 hover:text-white text-2xl leading-none">&times;</button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto font-mono space-y-6 flex-1">
                
                {/* Meta Data */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-white/40 block mb-1 uppercase">Category</span>
                    <span className="text-sm text-white">{selectedReport.category}</span>
                  </div>
                  <div className="border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-white/40 block mb-1 uppercase">Priority</span>
                    <span className={`text-sm font-bold ${selectedReport.priority === "Critical" ? "text-red-400" : "text-green-400"}`}>{selectedReport.priority}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">Incident Description</span>
                  <p className="text-sm text-white/90 bg-black border border-white/10 p-4 font-sans leading-relaxed">
                    <strong>{selectedReport.title}</strong><br/><br/>
                    {selectedReport.description}
                  </p>
                </div>

                {/* Location & Map Link */}
                <div className="border border-blue-500/20 bg-blue-500/5 p-4">
                  <span className="text-[10px] text-blue-400 block mb-2 uppercase tracking-widest font-bold">Geolocation Data</span>
                  <p className="text-xs text-white/70 mb-1"><strong>Address:</strong> {selectedReport.address || "N/A"}</p>
                  <p className="text-xs text-white/70 mb-3"><strong>Coordinates:</strong> {selectedReport.latitude}, {selectedReport.longitude}</p>
                  <a 
                    href={`https://www.google.com/maps?q=${selectedReport.latitude},${selectedReport.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-blue-400 transition"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>

                {/* Dispatch Section */}
                <div className="border border-red-500/20 bg-red-500/5 p-4 mt-4">
                  <span className="text-[10px] text-red-400 block mb-3 uppercase tracking-widest font-bold">Forward to Authority</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select 
                      value={selectedAuthority}
                      onChange={(e) => setSelectedAuthority(e.target.value)}
                      className="flex-1 bg-black border border-white/20 text-white px-3 py-2 text-xs outline-none focus:border-red-400"
                    >
                      <option value="">-- Select Department --</option>
                      {AUTHORITIES.map(auth => (
                        <option key={auth.email} value={auth.email}>{auth.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={handleDispatch}
                      disabled={!selectedAuthority || isDispatching}
                      className="bg-red-500 text-black font-bold uppercase tracking-wider text-xs px-6 py-2 disabled:opacity-50 hover:bg-red-400 transition whitespace-nowrap"
                    >
                      {isDispatching ? "Transmitting..." : "Dispatch Alert"}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}