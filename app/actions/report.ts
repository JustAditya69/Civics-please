"use server";

import { prisma } from "@/app/lib/prisma";
import { Resend } from "resend";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const CIVIC_QUOTES = [
  "“The ballot is stronger than the bullet.” — Abraham Lincoln",
  "“Ask not what your country can do for you – ask what you can do for your country.” — John F. Kennedy",
  "“Never doubt that a small group of thoughtful, committed citizens can change the world.” — Margaret Mead",
  "“Bad officials are elected by good citizens who do not vote or participate.” — George Jean Nathan",
  "“Citizenship is a hard thing. It means being a constructive member of your community.” — E.B. White"
];

export async function createReport(formData: {
  category: string;
  title: string;
  description: string;
  imageUrl?: string;
  latitude: string;
  longitude: string;
  address: string;
  priority: string;
  email?: string;
  name?: string;
  userId?: string;
}) {
  try {
    const category = formData.category ? formData.category.trim().slice(0, 50) : "";
    const title = formData.title ? formData.title.trim().slice(0, 150) : "Civic Incident";
    const description = formData.description ? formData.description.trim().slice(0, 3000) : "";
    const address = formData.address ? formData.address.trim().slice(0, 300) : "";
    const priority = ["Critical", "High", "Medium", "Low"].includes(formData.priority) 
      ? formData.priority 
      : "Medium";

    if (!category || !description) {
      return { success: false, error: "Category and description are required fields." };
    }

    const latNum = parseFloat(formData.latitude);
    const lngNum = parseFloat(formData.longitude);
    if (isNaN(latNum) || isNaN(lngNum) || latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
      return { success: false, error: "Invalid geographic coordinates provided." };
    }

    // Protect against oversized base64 payloads (max ~7MB)
    let cleanImageUrl: string | null = null;
    if (formData.imageUrl && typeof formData.imageUrl === "string") {
      if (formData.imageUrl.length > 7 * 1024 * 1024) {
        return { success: false, error: "Attached photo exceeds maximum 5MB size limit." };
      }
      cleanImageUrl = formData.imageUrl;
    }

    // Securely tie to user session if logged in
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("user_session")?.value;
    const effectiveUserId = sessionUserId || (formData.userId?.trim() || null);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingId = `CP-2026-${randomNum}`;

    const newReport = await prisma.report.create({
      data: {
        trackingId,
        category,
        title,
        description,
        imageUrl: cleanImageUrl,
        latitude: latNum.toFixed(6),
        longitude: lngNum.toFixed(6),
        address,
        priority,
        status: "AWAITING_REVIEW",
        userId: effectiveUserId,
      },
    });

    if (formData.email) {
      try {
        const randomQuote = CIVIC_QUOTES[Math.floor(Math.random() * CIVIC_QUOTES.length)];

        await resend.emails.send({
          from: "Civics Please <onboarding@resend.dev>",
          to: formData.email,
          subject: `[${trackingId}] Incident Report Registered Successfully`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #050806; color: #ffffff; padding: 30px; border-radius: 8px;">
              <div style="max-width: 600px; margin: auto; background-color: #0b110d; border: 1px solid rgba(74, 222, 128, 0.2); padding: 40px; border-radius: 6px;">
                
                <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
                  <h2 style="color: #4ade80; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Civics Please</h2>
                  <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px; margin: 5px 0 0 0;">Official Incident Redressal Portal</p>
                </div>

                <h1 style="color: #ffffff; font-size: 22px; margin-bottom: 10px;">Hello ${formData.name || "Citizen"},</h1>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px; line-height: 1.6;">
                  Your infrastructure hazard report regarding <strong>${category}</strong> has been securely logged into the municipal database and routed for review.
                </p>

                <div style="background-color: #000000; border: 1px solid rgba(74, 222, 128, 0.4); padding: 20px; text-align: center; margin: 30px 0; border-radius: 4px;">
                  <span style="display: block; font-size: 10px; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your Tracking Reference ID</span>
                  <span style="font-family: monospace; font-size: 28px; font-weight: bold; color: #4ade80; letter-spacing: 2px;">${trackingId}</span>
                </div>

                <div style="background-color: rgba(74, 222, 128, 0.05); border-left: 3px solid #4ade80; padding: 15px 20px; margin-bottom: 30px; font-style: italic; color: rgba(255, 255, 255, 0.8); font-size: 13px;">
                  ${randomQuote}
                </div>

                <p style="color: rgba(255, 255, 255, 0.4); font-size: 11px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; margin-top: 30px;">
                  This is an automated municipal dispatch notification. Please do not reply directly to this email.
                </p>

              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Notification email could not be sent (sandbox mode):", emailErr);
      }
    }

    return { success: true, trackingId: newReport.trackingId };
  } catch (error: any) {
    console.error("Database report creation error:", error);
    return { success: false, error: error?.message || "Failed to save report to database." };
  }
}