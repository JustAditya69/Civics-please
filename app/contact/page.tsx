"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactQuery } from "../actions/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await submitContactQuery(formData);
    
    if (result.success) {
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setErrorMessage(result.error || "Failed to submit your message. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* LEFT COLUMN: Contact Information */}
          <div className="flex flex-col justify-center border-r-0 lg:border-r-2 border-[#113320] lg:pr-12 pb-8 lg:pb-0 border-b-2 lg:border-b-0">
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3">
              CONTACT US
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#113320] uppercase leading-snug sm:leading-tight mb-4 sm:mb-6">
              GET IN TOUCH WITH <br />
              <span className="text-[#fa6355]">OUR SUPPORT TEAM</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70 mb-8 sm:mb-12 max-w-md">
              Whether you need help using the website, want to report a problem, or have a general question, our team is ready to assist you.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {/* Email Card */}
              <div className="border-2 border-[#113320] bg-white p-4 sm:p-6 shadow-retro flex gap-4 items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#fa6355] text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#113320] uppercase tracking-widest mb-1">EMAIL US</h3>
                  <p className="font-sans text-xs text-[#113320]/70 break-all">support@civicsplease.gov</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="border-2 border-[#113320] bg-white p-4 sm:p-6 shadow-retro flex gap-4 items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#fa6355] text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#113320] uppercase tracking-widest mb-1">CALL US</h3>
                  <p className="font-sans text-xs text-[#113320]/70">+91 800-123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="relative">
            <div className="border-2 border-[#113320] bg-[#f4ebd6] p-6 sm:p-10 shadow-[6px_6px_0px_#113320] sm:shadow-[12px_12px_0px_#113320]">
              
              {success ? (
                <div className="py-8 sm:py-12 text-center space-y-4">
                  <div className="w-16 h-16 border-2 border-[#113320] bg-[#bce3c5] text-[#113320] flex items-center justify-center mx-auto text-2xl font-bold mb-6">✓</div>
                  <h2 className="font-pixel text-xl sm:text-2xl text-[#113320] uppercase">MESSAGE SENT!</h2>
                  <p className="font-sans text-xs sm:text-sm text-[#113320]/70">Our team has received your query and will respond shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-8 border-2 border-[#113320] bg-white px-6 py-3 font-sans text-xs font-bold text-[#113320] uppercase shadow-retro hover:-translate-y-0.5 transition-transform min-h-[44px]">
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 sm:mb-8 border-b-2 border-[#113320]/20 pb-4">
                    <h2 className="font-pixel text-lg sm:text-xl text-[#113320] uppercase mb-2">SEND A MESSAGE</h2>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#fa6355]">WE USUALLY REPLY WITHIN 24 HOURS</p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 border-2 border-[#fa6355] bg-[#fa6355]/10 p-3 sm:p-4 text-xs sm:text-sm font-bold text-[#fa6355]">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block font-sans text-xs font-bold uppercase text-[#113320]">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border-2 border-[#113320] bg-white px-4 py-3 font-sans text-base outline-none focus:bg-[#e2f9e1] transition-colors" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="mb-2 block font-sans text-xs font-bold uppercase text-[#113320]">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-2 border-[#113320] bg-white px-4 py-3 font-sans text-base outline-none focus:bg-[#e2f9e1] transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-sans text-xs font-bold uppercase text-[#113320]">Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full border-2 border-[#113320] bg-white px-4 py-3 font-sans text-base outline-none focus:bg-[#e2f9e1] transition-colors" placeholder="What is this regarding?" />
                    </div>

                    <div>
                      <label className="mb-2 block font-sans text-xs font-bold uppercase text-[#113320]">Your Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full border-2 border-[#113320] bg-white p-4 font-sans text-base outline-none focus:bg-[#e2f9e1] transition-colors" placeholder="Type your message here..." />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full border-2 border-[#113320] bg-[#fa6355] py-4 font-sans text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-retro-lg active:translate-y-0.5 disabled:opacity-50 min-h-[48px]">
                      {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}