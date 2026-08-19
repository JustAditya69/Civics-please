"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactQuery } from "../actions/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactQuery(formData);
    
    if (result.success) {
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      alert(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <Navbar />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-green-500/5 blur-[150px]" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 relative z-10">
          
          {/* LEFT COLUMN: Contact Information */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-green-400" />
              <p className="text-sm font-medium tracking-[0.2em] text-green-400 uppercase">Contact Us</p>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-6">
              Get in Touch with<br />
              <span className="text-white/40">Our Support Team</span>
            </h1>
            
            <p className="text-base leading-relaxed text-white/60 mb-12 max-w-md">
              Whether you need help using the website, want to report a problem, or have a general question, our team is ready to assist you.
            </p>

            <div className="space-y-6">
              {/* Email Card */}
              <div className="group flex items-start gap-5 border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-green-400/30 hover:bg-white/[0.04]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-1">Email Us</h3>
                  <p className="text-sm text-white/50">support@civicsplease.gov</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group flex items-start gap-5 border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-green-400/30 hover:bg-white/[0.04]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-1">Call Us</h3>
                  <p className="text-sm text-white/50">+91 800-123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-green-500/20 to-transparent opacity-50 blur-xl" />
            
            <div className="relative border border-white/10 bg-[#0b110d] p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
              
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-400/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                  <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                  <p className="text-sm text-white/60">Our team has received your query and will respond shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-xs font-bold text-green-400 uppercase tracking-widest hover:text-green-300">Send Another</button>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">Send a Message</h2>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">We usually reply within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white outline-none focus:border-green-400" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white outline-none focus:border-green-400" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white outline-none focus:border-green-400" placeholder="What is this regarding?" />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Your Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full border border-white/10 bg-black/50 p-4 text-sm text-white outline-none focus:border-green-400" placeholder="Type your message here..." />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full border border-green-400 bg-green-400 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-green-300 disabled:opacity-50">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}