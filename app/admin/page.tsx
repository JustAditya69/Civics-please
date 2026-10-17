"use client";

import { useEffect, useState } from "react";
import { 
  getAllAdminReports, 
  updateReportStatus, 
  dispatchToAuthority,
  getAdminQueries,
  updateQueryStatus 
} from "../actions/admin";
import { triageIncidentWithAI } from "../actions/ai";
import { getReportOnChainProof } from "../lib/web3";
import Navbar from "../components/Navbar";

const AUTHORITIES = [
  { name: "Public Works Department (Roads)", email: "pwd@civicsplease.gov" },
  { name: "Sanitation & Waste Management", email: "sanitation@civicsplease.gov" },
  { name: "Water Board & Drainage", email: "water@civicsplease.gov" },
  { name: "Electrical & Street Lights", email: "electrical@civicsplease.gov" },
  { name: "Traffic Police Division", email: "traffic@civicsplease.gov" },
];

export default function AdminDashboardPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedAuthority, setSelectedAuthority] = useState("");
  const [isDispatching, setIsDispatching] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [adminAiAnalysis, setAdminAiAnalysis] = useState<any>(null);

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

  const handleGenerateAdminAI = async () => {
    if (!selectedReport) return;
    setIsGeneratingAI(true);
    try {
      const res = await triageIncidentWithAI({
        title: selectedReport.title,
        description: selectedReport.description,
        category: selectedReport.category,
        hasImage: !!selectedReport.imageUrl,
      });
      if (res.success && res.data) {
        setAdminAiAnalysis(res.data);
        const cat = res.data.suggestedCategory.toLowerCase();
        const matched = AUTHORITIES.find(a => 
          a.name.toLowerCase().includes(cat) || 
          cat.includes(a.name.toLowerCase().split(" ")[0])
        );
        if (matched) setSelectedAuthority(matched.email);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

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

  const handleLogout = async () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4 sm:px-6 py-8 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          
          {/* Header */}
          <div className="mb-8 md:mb-12 border-b-2 border-[#113320] pb-6 md:pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-2">
                SECURE MUNICIPAL GRID
              </p>
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-[#113320] uppercase leading-tight mb-2">
                AUTHORITY COMMAND
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#113320]/70">
                Manage city-wide incident reports and dispatch municipal crews.
              </p>
            </div>
            <div>
              <button 
                type="button"
                onClick={handleLogout} 
                className="border-2 border-[#113320] bg-white px-4 py-2.5 font-sans text-[10px] font-bold uppercase tracking-wider text-[#113320] shadow-[2px_2px_0px_#113320] hover:shadow-[4px_4px_0px_#113320] hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                TERMINATE SESSION
              </button>
            </div>
          </div>

          {actionMessage && (
            <div className="border-2 border-[#113320] bg-[#bce3c5] p-3 text-center mb-6">
              <span className="font-sans text-xs font-bold text-[#113320] uppercase">[SYSTEM] {actionMessage}</span>
            </div>
          )}

          {/* TABS */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab("REPORTS")}
              className={`border-2 border-[#113320] px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider shadow-retro transition-colors ${
                activeTab === "REPORTS" ? "bg-[#fa6355] text-white" : "bg-white text-[#113320] hover:bg-[#f4ebd6]"
              }`}
            >
              INCIDENT REPORTS
            </button>
            <button 
              onClick={() => setActiveTab("QUERIES")}
              className={`border-2 border-[#113320] px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider shadow-retro transition-colors ${
                activeTab === "QUERIES" ? "bg-[#fa6355] text-white" : "bg-white text-[#113320] hover:bg-[#f4ebd6]"
              }`}
            >
              SUPPORT QUERIES
            </button>
          </div>

          {/* REPORTS TAB VIEW */}
          {activeTab === "REPORTS" && (
            <div className="border-2 border-[#113320] bg-white p-6 md:p-10 shadow-[8px_8px_0px_#113320]">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 mb-6 border-b-2 border-[#113320]/20">
                <h2 className="font-pixel text-xl text-[#113320] uppercase">DISPATCH LEDGER</h2>
                <input
                  type="text"
                  placeholder="Search Tracking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-72 border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-xs outline-none focus:bg-white"
                />
              </div>

              <div className="flex gap-2 flex-wrap mb-8">
                {["ALL", "AWAITING_REVIEW", "IN_PROGRESS"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`border-2 border-[#113320] px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      filterStatus === status ? "bg-[#113320] text-white" : "bg-[#f4ebd6] text-[#113320] hover:bg-[#e2f9e1]"
                    }`}
                  >
                    {status.replace("_", " ")}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="border-2 border-[#113320] bg-[#f4ebd6] p-12 text-center">
                  <span className="font-pixel text-lg text-[#fa6355] animate-pulse">SYNCING DB...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border-2 border-[#113320]">
                    <thead className="bg-[#f4ebd6]">
                      <tr className="border-b-2 border-[#113320] font-sans text-xs font-bold text-[#113320] uppercase tracking-wider">
                        <th className="py-4 px-4 border-r-2 border-[#113320]">Tracking ID</th>
                        <th className="py-4 px-4 border-r-2 border-[#113320]">Category</th>
                        <th className="py-4 px-4 border-r-2 border-[#113320]">Priority</th>
                        <th className="py-4 px-4 border-r-2 border-[#113320]">Status</th>
                        <th className="py-4 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {filteredReports.map((report, idx) => (
                        <tr key={report.id} className={`border-b-2 border-[#113320] font-sans text-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-[#e2f9e1]'}`}>
                          <td className="py-4 px-4 border-r-2 border-[#113320] font-mono font-bold text-[#fa6355]">{report.trackingId}</td>
                          <td className="py-4 px-4 border-r-2 border-[#113320] text-[#113320] font-bold">{report.category}</td>
                          <td className="py-4 px-4 border-r-2 border-[#113320]">
                            <span className={`inline-block border-2 border-[#113320] px-2 py-1 text-[10px] uppercase font-bold tracking-wider ${
                              report.priority === "Critical" || report.priority === "High" ? "bg-[#fa6355] text-white" : "bg-white text-[#113320]"
                            }`}>
                              {report.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4 border-r-2 border-[#113320]">
                            <select
                              value={report.status}
                              onChange={(e) => handleStatusChange(report.id, e.target.value)}
                              className="border-2 border-[#113320] bg-white text-[#113320] px-2 py-1 text-[10px] font-bold uppercase outline-none"
                            >
                              <option value="AWAITING_REVIEW">Awaiting</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="RESOLVED">Resolved</option>
                            </select>
                          </td>
                          <td className="py-4 px-4">
                            <button 
                              onClick={() => setSelectedReport(report)}
                              className="border-2 border-[#113320] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#113320] shadow-[2px_2px_0px_#113320] hover:shadow-[4px_4px_0px_#113320] hover:-translate-y-0.5 transition-all"
                            >
                              VIEW DATA
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

          {/* QUERIES TAB VIEW */}
          {activeTab === "QUERIES" && (
            <div className="border-2 border-[#113320] bg-white p-6 md:p-10 shadow-[8px_8px_0px_#113320]">
              <h2 className="font-pixel text-xl text-[#113320] uppercase mb-8 border-b-2 border-[#113320]/20 pb-4">
                SUPPORT TRANSMISSIONS
              </h2>
              
              {loadingQueries ? (
                <div className="border-2 border-[#113320] bg-[#f4ebd6] p-12 text-center">
                  <span className="font-pixel text-lg text-[#fa6355] animate-pulse">DECRYPTING...</span>
                </div>
              ) : queries.length === 0 ? (
                <div className="border-2 border-[#113320] bg-[#e2f9e1] p-12 text-center">
                  <span className="font-sans text-sm font-bold text-[#113320] uppercase">No support queries found.</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {queries.map((query) => (
                    <div key={query.id} className="border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-[4px_4px_0px_#113320] flex flex-col md:flex-row gap-6 justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`h-3 w-3 border border-[#113320] ${query.status === "UNREAD" ? "bg-[#fa6355] animate-pulse" : "bg-[#bce3c5]"}`} />
                          <h3 className="font-sans text-base font-bold text-[#113320]">{query.subject}</h3>
                        </div>
                        
                        <div className="flex flex-col font-sans text-xs text-[#113320]/70 uppercase font-bold tracking-wider">
                          <span>CITIZEN: {query.name}</span>
                          <span>COMM LINK: {query.email}</span>
                          <span>DATE: {new Date(query.createdAt).toLocaleString()}</span>
                        </div>
                        
                        <div className="p-4 bg-white border-2 border-[#113320] text-sm text-[#113320] leading-relaxed font-sans shadow-retro">
                          {query.message}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 min-w-[150px] justify-start pt-2">
                        <div>
                          <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#113320]/60 mb-2 block">STATUS</label>
                          <select
                            value={query.status}
                            onChange={(e) => handleQueryStatus(query.id, e.target.value)}
                            className="w-full border-2 border-[#113320] bg-white text-[#113320] px-3 py-2 text-xs font-bold uppercase outline-none focus:bg-[#e2f9e1]"
                          >
                            <option value="UNREAD">Unread</option>
                            <option value="READ">Read</option>
                            <option value="RESOLVED">Resolved</option>
                          </select>
                        </div>
                        
                        <a 
                          href={`mailto:${query.email}?subject=Re: ${query.subject}`} 
                          className="text-center border-2 border-[#113320] bg-[#fa6355] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 transition-all mt-auto"
                        >
                          REPLY VIA EMAIL
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#113320]/80 p-2 sm:p-4">
              <div className="w-full max-w-3xl border-4 border-[#113320] bg-[#f4ebd6] shadow-[6px_6px_0px_#113320] sm:shadow-[12px_12px_0px_#113320] flex flex-col max-h-[94vh]">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b-4 border-[#113320] p-4 sm:p-6 bg-white">
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest block mb-1">INCIDENT DOSSIER</span>
                    <h3 className="font-pixel text-base sm:text-xl text-[#113320] uppercase">{selectedReport.trackingId}</h3>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="border-2 border-[#113320] bg-white w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-pixel text-lg sm:text-xl text-[#113320] hover:bg-[#fa6355] hover:text-white transition-colors">&times;</button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
                  
                  {/* Meta Data */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="border-2 border-[#113320] bg-white p-4 shadow-[4px_4px_0px_#113320]">
                      <span className="font-sans text-[10px] font-bold text-[#113320]/50 block mb-1 uppercase">Category</span>
                      <span className="font-sans text-sm font-bold text-[#113320]">{selectedReport.category}</span>
                    </div>
                    <div className="border-2 border-[#113320] bg-white p-4 shadow-[4px_4px_0px_#113320]">
                      <span className="font-sans text-[10px] font-bold text-[#113320]/50 block mb-1 uppercase">Priority</span>
                      <span className={`font-sans text-sm font-bold ${selectedReport.priority === "Critical" ? "text-[#fa6355]" : "text-[#113320]"}`}>{selectedReport.priority}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-2 border-[#113320] bg-white p-6 shadow-[4px_4px_0px_#113320]">
                    <span className="font-sans text-[10px] font-bold text-[#113320]/50 block mb-3 uppercase tracking-widest">Incident Description</span>
                    <div className="font-sans text-sm text-[#113320]/90 leading-relaxed">
                      <strong className="block mb-2 text-base text-[#113320]">{selectedReport.title}</strong>
                      <p className="bg-[#f4ebd6] p-4 border-2 border-[#113320]">{selectedReport.description}</p>
                    </div>
                  </div>

                  {/* Attached Image */}
                  {selectedReport.imageUrl && (
                    <div className="border-2 border-[#113320] bg-white p-6 shadow-[4px_4px_0px_#113320]">
                      <span className="font-sans text-[10px] font-bold text-[#113320]/50 block mb-3 uppercase tracking-widest">Attached Evidence</span>
                      <div className="border-2 border-[#113320] bg-[#f4ebd6] p-2">
                        <img 
                          src={selectedReport.imageUrl} 
                          alt="Incident Evidence" 
                          className="w-full max-h-[400px] object-contain border-2 border-[#113320]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Location & Map Link */}
                  <div className="border-2 border-[#113320] bg-[#bce3c5] p-6 shadow-[4px_4px_0px_#113320]">
                    <span className="font-sans text-[10px] font-bold text-[#113320] block mb-3 uppercase tracking-widest">Geolocation Data</span>
                    <p className="font-sans text-sm text-[#113320] mb-2"><strong>Address:</strong> {selectedReport.address || "N/A"}</p>
                    <p className="font-sans text-sm text-[#113320] mb-4"><strong>Coordinates:</strong> {selectedReport.latitude}, {selectedReport.longitude}</p>
                    <a 
                      href={`https://www.google.com/maps?q=${selectedReport.latitude},${selectedReport.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-2 border-[#113320] bg-white text-[#113320] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#113320] hover:text-white transition-colors"
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>

                  {/* AI Dispatch Copilot Section */}
                  <div className="border-2 border-[#113320] bg-[#e2f9e1] p-5 sm:p-6 shadow-[4px_4px_0px_#113320]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center border-2 border-[#113320] bg-white text-sm">🤖</span>
                        <h4 className="font-pixel text-xs text-[#113320] uppercase">AI DISPATCH COPILOT</h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerateAdminAI}
                        disabled={isGeneratingAI}
                        className="border-2 border-[#113320] bg-[#fa6355] text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#113320] hover:shadow-[4px_4px_0px_#113320] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                      >
                        {isGeneratingAI ? "ANALYZING..." : "⚡ RUN AI ASSESSMENT"}
                      </button>
                    </div>

                    {adminAiAnalysis ? (
                      <div className="space-y-3 font-sans text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white border-2 border-[#113320] p-3">
                            <span className="text-[10px] font-bold text-[#113320]/60 uppercase block mb-1">Hazard Risk Score</span>
                            <span className="font-pixel text-sm text-[#fa6355]">{adminAiAnalysis.hazardScore}/100</span>
                            <span className="block text-[10px] font-bold text-[#113320] mt-1">{adminAiAnalysis.urgencyLevel} Priority</span>
                          </div>
                          <div className="bg-white border-2 border-[#113320] p-3">
                            <span className="text-[10px] font-bold text-[#113320]/60 uppercase block mb-1">Target Department</span>
                            <span className="font-bold text-[11px] text-[#113320] leading-tight block">{adminAiAnalysis.recommendedDepartment}</span>
                          </div>
                        </div>

                        <div className="bg-white border-2 border-[#113320] p-3">
                          <span className="text-[10px] font-bold text-[#113320]/60 uppercase block mb-1">Safety Advisory</span>
                          <p className="font-bold text-[#fa6355] text-[11px]">{adminAiAnalysis.safetyAdvisory}</p>
                        </div>

                        <div className="bg-[#f4ebd6] border-2 border-[#113320] p-3">
                          <span className="text-[10px] font-bold text-[#113320]/60 uppercase block mb-1">Field Dispatch Briefing</span>
                          <p className="font-mono text-[11px] text-[#113320] whitespace-pre-wrap">{adminAiAnalysis.dispatchBriefing}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="font-sans text-xs text-[#113320]/75">
                        Click "Run AI Assessment" to generate a field crew briefing, calculate public hazard score, and automatically select the optimal municipal authority.
                      </p>
                    )}
                  </div>

                  {/* Web3 On-Chain Ledger Anchor */}
                  {selectedReport && (() => {
                    const proof = getReportOnChainProof(selectedReport);
                    return (
                      <div className="border-2 border-[#113320] bg-white p-5 shadow-[4px_4px_0px_#113320]">
                        <div className="flex items-center justify-between mb-3 border-b-2 border-[#113320]/20 pb-2">
                          <span className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-widest">
                            ⛓️ ON-CHAIN PROOF OF INCIDENT
                          </span>
                          <span className="font-sans text-[10px] font-bold text-green-700 uppercase bg-[#e2f9e1] border border-[#113320] px-2 py-0.5">
                            VERIFIED IMMUTABLE
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-[#113320] space-y-1.5 break-all">
                          <p><strong className="font-sans uppercase text-[10px] text-[#113320]/60">Proof Hash:</strong> {proof.proofHash}</p>
                          <p><strong className="font-sans uppercase text-[10px] text-[#113320]/60">IPFS CID:</strong> {proof.ipfsCid}</p>
                          <p><strong className="font-sans uppercase text-[10px] text-[#113320]/60">Ledger:</strong> {proof.network} (Block #{proof.blockNumber})</p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Dispatch Section */}
                  <div className="border-2 border-[#113320] bg-white p-6 shadow-[4px_4px_0px_#113320]">
                    <span className="font-sans text-[10px] font-bold text-[#fa6355] block mb-3 uppercase tracking-widest">Forward to Authority</span>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <select 
                        value={selectedAuthority}
                        onChange={(e) => setSelectedAuthority(e.target.value)}
                        className="flex-1 border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-xs font-bold uppercase outline-none focus:bg-white"
                      >
                        <option value="">-- Select Department --</option>
                        {AUTHORITIES.map(auth => (
                          <option key={auth.email} value={auth.email}>{auth.name}</option>
                        ))}
                      </select>
                      <button 
                        onClick={handleDispatch}
                        disabled={!selectedAuthority || isDispatching}
                        className="border-2 border-[#113320] bg-[#fa6355] text-white font-sans text-xs font-bold uppercase tracking-wider px-8 py-3 disabled:opacity-50 hover:bg-[#e05649] transition-colors whitespace-nowrap shadow-retro"
                      >
                        {isDispatching ? "TRANSMITTING..." : "DISPATCH ALERT"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}