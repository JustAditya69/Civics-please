"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createReport } from "../actions/report";
import Navbar from "../components/Navbar";

import { triageIncidentWithAI } from "../actions/ai";
import { AIAnalysisResult } from "../lib/ai";
import { Web3Manager, getReportOnChainProof } from "../lib/web3";

const LocationPicker = dynamic(
  () => import("../components/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#e2f9e1]">
        <span className="font-pixel text-xs text-[#fa6355] animate-pulse">
          INITIALIZING MAP ENGINE...
        </span>
      </div>
    ),
  }
);

function ReportFormContent() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "";

  const [formData, setFormData] = useState({
    name: "Anonymous Citizen",
    email: "citizen@example.com",
    phone: "",
    category: queryCategory || "Roads & Potholes",
    title: "",
    description: "",
    address: "",
    latitude: "40.7128",
    longitude: "-74.0060",
  });
  
  const [priority, setPriority] = useState("Medium");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  // Live Camera & Photo Upload State
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  // AI & Web3 State
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [tokensEarned, setTokensEarned] = useState(0);

  const categories = ["Roads & Potholes", "Street Lights", "Garbage & Waste", "Water & Drainage", "Traffic & Signals", "Parks & Public Spaces"];

  // Ensure category state updates if URL changes while on the page
  useEffect(() => {
    if (queryCategory) {
      setFormData((prev) => ({ ...prev, category: queryCategory }));
    }
  }, [queryCategory]);

  // Clean up media stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (cat: string) => {
    if (!queryCategory) {
      setFormData({ ...formData, category: cat });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreviews([base64String]);
      };
      reader.readAsDataURL(file);
    }
  };

  const startLiveCamera = async (overrideFacing?: "environment" | "user") => {
    const targetMode = overrideFacing || facingMode;

    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Fallback to native device camera file picker
        cameraInputRef.current?.click();
        return;
      }

      // Stop previous stream if active
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: targetMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setCameraStream(stream);
      setIsLiveCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((e) => console.warn("Video play error:", e));
        }
      }, 100);
    } catch (err: any) {
      console.warn("Live camera access failed, falling back to native device camera:", err);
      // Seamlessly trigger native OS camera input!
      cameraInputRef.current?.click();
    }
  };

  const stopLiveCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsLiveCameraOpen(false);
  };

  const capturePhotoFromVideo = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

    setImagePreviews([dataUrl]);
    stopLiveCamera();
  };

  const switchCamera = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startLiveCamera(nextMode);
  };

  const removePhoto = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (lat: string, lng: string, address: string) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: address,
    }));
  };

  // Run AI Triage
  const handleAITriage = async () => {
    setIsAnalyzingAI(true);
    try {
      const res = await triageIncidentWithAI({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        hasImage: imagePreviews.length > 0,
      });

      if (res.success && res.data) {
        setAiAnalysis(res.data);
      } else {
        alert(res.error || "AI could not process this request.");
      }
    } catch (e: any) {
      console.error("AI error:", e);
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  // Apply AI Suggestions to Form
  const applyAISuggestions = () => {
    if (!aiAnalysis) return;
    setFormData((prev) => ({
      ...prev,
      title: aiAnalysis.suggestedTitle || prev.title,
      description: aiAnalysis.enhancedDescription || prev.description,
      category: aiAnalysis.suggestedCategory || prev.category,
    }));
    if (aiAnalysis.urgencyLevel) {
      setPriority(aiAnalysis.urgencyLevel);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.description || !formData.latitude) {
      alert("Please ensure category, description, and location are provided.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentUserId = localStorage.getItem("user_token") || undefined;
      const imageUrl = imagePreviews.length > 0 ? imagePreviews[0] : undefined;

      const result = await createReport({
        category: formData.category,
        title: formData.title || "Untitled Civic Issue",
        description: formData.description,
        imageUrl: imageUrl,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        priority: priority,
        email: formData.email,
        name: formData.name,
        userId: currentUserId,
      });

      if (result && result.success && result.trackingId) {
        setTrackingId(result.trackingId);
        
        // Award Web3 $CIVIC Tokens (strictly 50 points per verified report for this user)
        const rewardResult = Web3Manager.rewardReport(result.trackingId, currentUserId);
        Web3Manager.unlockBadge("scout", currentUserId);
        if (formData.category.includes("Road")) Web3Manager.unlockBadge("sentinel", currentUserId);
        if (formData.category.includes("Light")) Web3Manager.unlockBadge("beacon", currentUserId);
        if (formData.category.includes("Garbage")) Web3Manager.unlockBadge("eco", currentUserId);

        setTokensEarned(rewardResult.points || 50);
        setSuccessMessage(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(result?.error || "Failed to submit report to database.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.message || "An unexpected network or database error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="min-h-screen pt-12 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 text-center">
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 border-2 border-[#113320] px-3 py-1.5 bg-[#e2f9e1] w-max shadow-retro">
            <span className="h-2.5 w-2.5 bg-[#fa6355] border border-[#113320]" />
            <p className="font-sans text-[10px] font-bold tracking-widest text-[#113320] uppercase">
              MISSION ACCOMPLISHED · ANCHORED ON-CHAIN
            </p>
          </div>
          <h1 className="font-pixel text-2xl sm:text-4xl text-[#113320] uppercase leading-tight mb-4 sm:mb-6">REPORT FILED</h1>
          <p className="font-sans text-sm sm:text-lg text-[#113320]/70 mb-8 max-w-lg mx-auto">
            Your report has been received, routed to the municipal queue, and cryptographically registered on the blockchain.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            <div className="border-2 border-[#113320] bg-white p-5 shadow-retro">
              <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase tracking-widest mb-1">TRACKING REFERENCE</p>
              <p className="font-pixel text-lg sm:text-xl text-[#fa6355]">{trackingId}</p>
            </div>
            
            <div className="border-2 border-[#113320] bg-[#e2f9e1] p-5 shadow-retro">
              <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase tracking-widest mb-1">WEB3 REWARD CLAIMED</p>
              <p className="font-pixel text-lg sm:text-xl text-[#113320]">+{tokensEarned} $CIVIC</p>
            </div>
          </div>

          <div className="border-2 border-[#113320] bg-[#f4ebd6] p-4 text-xs font-mono text-[#113320] max-w-lg mx-auto mb-8 flex items-center justify-between">
            <span>PROOF STATUS:</span>
            <span className="font-bold text-green-700">✓ IMMUTABLE PROOF GENERATED</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`/track?id=${trackingId}`} className="w-full sm:w-auto border-2 border-[#113320] bg-[#fa6355] px-8 py-4 font-sans text-sm font-bold text-white uppercase tracking-wider shadow-retro hover:shadow-retro-lg transition-all text-center">
              TRACK CASE & VERIFY ON-CHAIN →
            </a>
            <a href="/dashboard" className="w-full sm:w-auto border-2 border-[#113320] bg-white px-8 py-4 font-sans text-sm font-bold text-[#113320] uppercase tracking-wider shadow-retro hover:shadow-retro-lg transition-all text-center">
              VIEW CIVIC VAULT
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 md:py-16">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3">
            NEW MISSION - 01
          </p>
          <h1 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-[#113320] uppercase leading-tight mb-3">
            REPORT AN ISSUE
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#113320]/70">
            Give the city the clearest possible signal. Fields marked with an asterisk are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            
            {/* Category */}
            <div className="border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro">
              <h2 className="font-pixel text-lg text-[#113320] uppercase mb-6">1. CHOOSE CATEGORY *</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    disabled={!!queryCategory && queryCategory !== cat}
                    className={`border-2 transition-all p-3 text-center flex flex-col items-center gap-2 ${
                      formData.category === cat 
                        ? 'border-[#113320] bg-[#fa6355] text-white' 
                        : 'border-[#113320]/20 bg-white text-[#113320] hover:border-[#113320]'
                    } ${!!queryCategory && queryCategory !== cat ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="font-sans text-xs font-bold">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Civic Copilot Widget */}
            <div className="border-2 border-[#113320] bg-[#e2f9e1] p-5 sm:p-6 shadow-retro relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center border-2 border-[#113320] bg-white text-base">🤖</span>
                  <div>
                    <h3 className="font-pixel text-xs text-[#113320] uppercase tracking-wider">CIVIC AI COPILOT</h3>
                    <p className="font-sans text-[10px] text-[#113320]/70 font-bold uppercase">Automated Hazard Analysis & Auto-Fill</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAITriage}
                  disabled={isAnalyzingAI}
                  className="w-full sm:w-auto border-2 border-[#113320] bg-[#fa6355] text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#113320] hover:shadow-[4px_4px_0px_#113320] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                >
                  {isAnalyzingAI ? "SCANNING HAZARDS..." : "✨ ANALYZE WITH AI"}
                </button>
              </div>

              {aiAnalysis ? (
                <div className="border-2 border-[#113320] bg-white p-4 space-y-3 mt-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#113320]/20 pb-2">
                    <span className="font-sans text-[10px] font-bold text-[#113320] uppercase">
                      Urgency Score: <span className="text-[#fa6355]">{aiAnalysis.hazardScore}/100 ({aiAnalysis.urgencyLevel})</span>
                    </span>
                    <span className="font-sans text-[10px] font-bold text-[#113320] uppercase">
                      Target: {aiAnalysis.recommendedDepartment}
                    </span>
                  </div>

                  <div>
                    <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase">Suggested Title:</p>
                    <p className="font-sans text-xs font-bold text-[#113320]">{aiAnalysis.suggestedTitle}</p>
                  </div>

                  <div>
                    <p className="font-sans text-[10px] font-bold text-[#113320]/60 uppercase">Enhanced Civic Description:</p>
                    <p className="font-sans text-xs text-[#113320]/80 italic">{aiAnalysis.enhancedDescription}</p>
                  </div>

                  <button
                    type="button"
                    onClick={applyAISuggestions}
                    className="w-full border-2 border-[#113320] bg-[#bce3c5] text-[#113320] py-2 font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#a5d8b0] transition-colors"
                  >
                    ✓ APPLY AI SUGGESTIONS TO FORM
                  </button>
                </div>
              ) : (
                <p className="font-sans text-xs text-[#113320]/75">
                  Type a few rough notes or attach a photo, then tap Analyze. The AI will detect the municipal department, severity level, and refine your incident description.
                </p>
              )}
            </div>

            {/* Situation */}
            <div className="border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro">
              <h2 className="font-pixel text-lg text-[#113320] uppercase mb-6">2. WHAT'S THE SITUATION *</h2>
              
              <div className="mb-4">
                <label className="block font-sans text-xs font-bold text-[#113320] mb-2">Short Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Massive pothole on 5th Ave"
                  className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-[#113320] mb-2">What did you notice?</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Add size, hazards, nearby landmarks, or other useful details..."
                  className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Photo Evidence */}
            <div className="border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-pixel text-lg text-[#113320] uppercase">3. PHOTO EVIDENCE</h2>
                <span className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest">
                  {imagePreviews.length > 0 ? "✓ 1 PHOTO ATTACHED" : "OPTIONAL BUT RECOMMENDED"}
                </span>
              </div>

              {/* Hidden Inputs for Direct Hardware Access */}
              {/* 1. Native Camera Trigger (Directly opens device camera app on Android/iOS/Expo Go) */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                id="camera-capture-input"
              />

              {/* 2. Gallery / File Upload Trigger */}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="gallery-upload-input"
              />

              {/* Action Buttons: Take Photo vs Choose from Files */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Take Photo Button */}
                <button
                  type="button"
                  onClick={() => startLiveCamera()}
                  className="border-2 border-[#113320] bg-[#fa6355] text-white p-4 font-sans font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#113320] hover:shadow-[5px_5px_0px_#113320] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5"
                >
                  <span className="text-xl">📸</span>
                  <div className="text-left">
                    <span className="block leading-tight font-pixel text-[11px]">TAKE LIVE PHOTO</span>
                    <span className="block text-[9px] font-sans font-normal opacity-90">Open Device Camera</span>
                  </div>
                </button>

                {/* Upload from Gallery Button */}
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="border-2 border-[#113320] bg-white text-[#113320] p-4 font-sans font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#113320] hover:shadow-[5px_5px_0px_#113320] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5"
                >
                  <span className="text-xl">📁</span>
                  <div className="text-left">
                    <span className="block leading-tight font-pixel text-[11px]">CHOOSE FROM FILES</span>
                    <span className="block text-[9px] font-sans font-normal text-[#113320]/60">Gallery / Album</span>
                  </div>
                </button>
              </div>

              {/* Active Image Previews */}
              {imagePreviews.length > 0 ? (
                <div className="border-2 border-[#113320] bg-white p-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group flex-shrink-0">
                      <img
                        src={imagePreviews[0]}
                        alt="Incident Proof"
                        className="h-32 w-32 object-cover border-2 border-[#113320] shadow-[2px_2px_0px_#113320]"
                      />
                      <div className="absolute top-1 left-1 bg-[#113320] text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                        EVIDENCE #1
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-sans text-xs font-bold text-[#113320] uppercase tracking-wide">
                          Photo Evidence Attached
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#113320]/70">
                        This photographic evidence will be analyzed by AI and registered with your on-chain incident record.
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => startLiveCamera()}
                          className="border border-[#113320] bg-[#e2f9e1] text-[#113320] px-3 py-1.5 font-sans text-[10px] font-bold uppercase hover:bg-[#bce3c5] transition-colors flex items-center gap-1"
                        >
                          <span>🔄</span> Retake Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => removePhoto(0)}
                          className="border border-[#113320] bg-[#fa6355]/10 text-[#fa6355] px-3 py-1.5 font-sans text-[10px] font-bold uppercase hover:bg-[#fa6355] hover:text-white transition-colors flex items-center gap-1"
                        >
                          <span>✕</span> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => galleryInputRef.current?.click()}
                  className="border-2 border-dashed border-[#113320]/40 bg-[#e2f9e1]/60 hover:bg-white p-5 text-center cursor-pointer transition-colors"
                >
                  <p className="font-sans text-xs font-bold text-[#113320]/70 uppercase tracking-wider mb-1">
                    No photo attached yet
                  </p>
                  <p className="font-sans text-[10px] text-[#113320]/50">
                    Tap &quot;Take Live Photo&quot; to capture on-site or &quot;Choose from Files&quot; to select an existing picture.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8 flex flex-col">
            
            {/* Location */}
            <div className="border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-pixel text-lg text-[#113320] uppercase">4. SET LOCATION *</h2>
                <span className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest">NEEDS PIN</span>
              </div>
              
              <div className="border-2 border-[#113320] bg-white min-h-[380px] h-96 mb-4 relative z-0">
                <LocationPicker
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onLocationChange={handleLocationChange}
                />
              </div>

              <div className="mb-6">
                <label className="block font-sans text-xs font-bold text-[#113320] mb-2">Nearest address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, landmark, or intersection"
                  className="w-full border-2 border-[#113320] bg-[#e2f9e1] px-4 py-3 font-sans text-sm outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="mt-auto space-y-4">
                <div className="border-2 border-[#113320] bg-[#bce3c5] p-3 text-sm font-sans text-[#113320]">
                  <span className="text-[#eab308] mr-2">🔒</span>
                  Your report is public, but your contact details are never displayed.
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border-2 border-[#113320] bg-[#fa6355] px-8 py-4 font-sans text-lg font-bold text-white uppercase tracking-wider shadow-retro hover:shadow-retro-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "TRANSMITTING..." : "SUBMIT REPORT"}
                </button>
              </div>
            </div>

          </div>

        </form>
      </div>

      {/* Full-Screen Live Camera Viewfinder Modal */}
      {isLiveCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="w-full max-w-lg flex items-center justify-between text-white border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-pixel text-[11px] tracking-widest text-[#e2f9e1]">
                LIVE CAMERA SENSOR
              </span>
            </div>
            <button
              type="button"
              onClick={stopLiveCamera}
              className="border border-white/40 bg-white/10 hover:bg-white hover:text-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              ✕ CANCEL
            </button>
          </div>

          {/* Video Viewfinder Container */}
          <div className="relative w-full max-w-lg flex-1 my-4 flex items-center justify-center bg-black border-2 border-[#113320] overflow-hidden shadow-[0_0_20px_rgba(250,99,85,0.3)]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Viewfinder Target Crosshairs Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-[#fa6355]/60 relative">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#fa6355]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#fa6355]" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#fa6355]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#fa6355]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#fa6355]/40 text-xl font-mono">+</span>
                </div>
              </div>
            </div>

            {/* Bottom Guideline */}
            <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
              <span className="bg-black/70 text-[#e2f9e1] font-mono text-[10px] px-3 py-1 border border-white/20">
                ALIGN CIVIC HAZARD IN TARGET
              </span>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="w-full max-w-lg flex items-center justify-around gap-4 pt-2">
            <button
              type="button"
              onClick={switchCamera}
              className="border-2 border-white bg-white/10 hover:bg-white hover:text-black text-white p-3 font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              title="Switch Camera"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">FLIP</span>
            </button>

            {/* Shutter Button */}
            <button
              type="button"
              onClick={capturePhotoFromVideo}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-white bg-[#fa6355] hover:scale-105 active:scale-95 shadow-[0_0_15px_#fa6355] flex items-center justify-center transition-all group"
              title="Capture Photo"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white/80 bg-white/20 group-hover:bg-white/40 transition-colors" />
            </button>

            <button
              type="button"
              onClick={() => {
                stopLiveCamera();
                cameraInputRef.current?.click();
              }}
              className="border-2 border-white bg-white/10 hover:bg-white hover:text-black text-white p-3 font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              title="Use Native Phone Camera App"
            >
              <span>📱</span>
              <span className="hidden sm:inline">NATIVE</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="font-pixel text-xl text-[#fa6355] animate-pulse">LOADING MAP DATA...</span>
        </div>
      }>
        <ReportFormContent />
      </Suspense>
    </>
  );
}