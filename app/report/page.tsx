"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createReport } from "../actions/report";
import LocationPicker from "../components/LocationPicker";

function ReportFormContent() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: queryCategory, // Pre-fill from URL if it exists
    title: "",
    description: "",
    address: "",
    latitude: "12.9716",
    longitude: "77.5946",
  });
  
  const [priority, setPriority] = useState("Medium");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Camera stream states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ensure category state updates if URL changes while on the page
  useEffect(() => {
    if (queryCategory) {
      setFormData((prev) => ({ ...prev, category: queryCategory }));
    }
  }, [queryCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...filesArray]);
    }
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera. Please check permissions.");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/jpeg");
        setImagePreviews((prev) => [...prev, imageUrl]);
      }
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const handleLocationChange = (lat: string, lng: string, address: string) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: address,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.description || !formData.latitude) {
      alert("Please ensure your name, category, description, and location are provided.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Retrieve the logged-in user ID from localStorage to link the report to the dashboard
      const currentUserId = localStorage.getItem("user_token") || undefined;

      const result = await createReport({
        category: formData.category,
        title: formData.title || "Untitled Civic Issue",
        description: formData.description,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        priority: priority,
        email: formData.email,
        name: formData.name,
        userId: currentUserId, // Links report directly to the logged-in user's account
      });

      if (result && result.success && result.trackingId) {
        setSuccessMessage(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Redirect to dashboard after 3.5 seconds so they can view their new report
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3500);
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

  return (
    <main className="min-h-screen bg-[#050806] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Top status bar */}
        <div className="mb-4 flex items-center justify-between border border-white/[0.08] bg-[#0a0f0c]/90 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">
              CIVICS PLEASE
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/30">
            SECURE INCIDENT FILING PORTAL
          </span>
        </div>

        {/* Form or Success Container */}
        <div className="relative border border-green-400/10 bg-[#0b110d] p-6 sm:p-10 lg:p-14 shadow-2xl">
          
          {successMessage ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-400/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white">Thank you for reporting!</h2>
              <p className="text-sm text-white/60 max-w-md mx-auto">
                Your report has been successfully registered and linked to your account. Please check your email for your tracking reference ID and details.
              </p>
              <p className="text-xs text-green-400/80 pt-4 animate-pulse uppercase tracking-widest font-semibold">
                Redirecting you to your dashboard...
              </p>
            </div>
          ) : (
            <div>
              <div className="border-b border-white/10 pb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">File Civic Incident</h1>
                <p className="mt-2 text-sm text-white/40">
                  Submit infrastructure complaints directly to the regional database with precise geolocation tracking.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                
                {/* Citizen information */}
                <div>
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                    1. Citizen Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Aditya"
                        required
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="aditya@example.com"
                        required
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Incident specification */}
                <div className="border-t border-white/10 pt-6">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                    2. Incident Specification
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        disabled={!!queryCategory} // Lock if passed via URL
                        className={`w-full border-b border-white/20 px-0 py-3 text-sm outline-none focus:border-green-400 ${
                          !!queryCategory 
                            ? "bg-transparent text-white/50 cursor-not-allowed" 
                            : "bg-[#0b110d] text-white"
                        }`}
                      >
                        <option value="">Select category...</option>
                        <option value="Roads & Potholes">Roads & Potholes</option>
                        <option value="Street Lights">Street Lights</option>
                        <option value="Garbage & Waste">Garbage & Waste</option>
                        <option value="Water & Drainage">Water & Drainage</option>
                        <option value="Parks & Public Spaces">Parks & Public Spaces</option>
                        <option value="Traffic & Signals">Traffic & Signals</option>
                        <option value="Other">Other Civic Issue</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Issue Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Large pothole near main junction"
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Detailed Description *</label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Provide precise details regarding the severity and exact landmark..."
                      className="w-full border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-green-400"
                    />
                  </div>

                  {/* Priority Selector */}
                  <div className="mt-6">
                    <label className="mb-3 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Priority Level</label>
                    <div className="flex gap-4">
                      {["Low", "Medium", "High", "Critical"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`flex-1 border py-3 text-xs font-semibold uppercase tracking-wider transition ${
                            priority === p 
                              ? "border-green-400 bg-green-400/10 text-green-400" 
                              : "border-white/10 bg-transparent text-white/50 hover:border-white/30"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Map & Location Coordinates */}
                <div className="border-t border-white/10 pt-6">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                    3. Map & Location Coordinates
                  </h2>
                  
                  <LocationPicker
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    onLocationChange={handleLocationChange}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Latitude *</label>
                      <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Longitude *</label>
                      <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-green-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Resolved Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Auto-filled via GPS or manual address description"
                      className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white/80 outline-none focus:border-green-400"
                    />
                  </div>
                </div>

                {/* Evidence Image Upload & Camera Capture */}
                <div className="border-t border-white/10 pt-6">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                    4. Photographic Evidence
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <label className="border border-green-400 bg-green-400/10 px-4 py-2 text-xs font-semibold text-green-400 hover:bg-green-400/20 cursor-pointer transition">
                      📁 Choose Files
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={startCamera}
                      className="border border-green-400 bg-green-400/10 px-4 py-2 text-xs font-semibold text-green-400 hover:bg-green-400/20 transition"
                    >
                      📷 Open Camera & Snap
                    </button>
                  </div>

                  {/* Live Camera View Modal/Box */}
                  {isCameraActive && (
                    <div className="my-4 border border-green-400/30 bg-black p-4 space-y-3">
                      <div className="relative w-full h-64 bg-black overflow-hidden">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={capturePhoto}
                          className="bg-green-400 text-black px-4 py-2 text-xs font-bold uppercase"
                        >
                          Capture Photo
                        </button>
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="border border-white/20 text-white px-4 py-2 text-xs font-bold uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <canvas ref={canvasRef} className="hidden" />

                  {imagePreviews.length > 0 && (
                    <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                      {imagePreviews.map((src, index) => (
                        <img key={index} src={src} alt="Preview" className="h-20 w-20 object-cover border border-white/20" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border border-green-400 bg-green-400 py-4 text-sm font-semibold text-black transition-all hover:bg-green-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Transmitting to Database..." : "Submit Official Report"}
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050806] flex items-center justify-center">
        <span className="text-xs font-mono text-green-400 animate-pulse tracking-widest uppercase">
          Initializing Secure Terminal...
        </span>
      </div>
    }>
      <ReportFormContent />
    </Suspense>
  );
}