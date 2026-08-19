"use server";

import { prisma } from "@/app/lib/prisma";
import { Resend } from "resend";

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
  latitude: string;
  longitude: string;
  address: string;
  priority: string;
  email?: string;
  name?: string;
  userId?: string;
}) {
  try {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingId = `CP-2026-${randomNum}`;

    const newReport = await prisma.report.create({
      data: {
        trackingId,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        priority: formData.priority,
        status: "AWAITING_REVIEW",
        userId: formData.userId && formData.userId.trim() !== "" ? formData.userId : null,
      },
    });

    if (formData.email) {
      const randomQuote = CIVIC_QUOTES[Math.floor(Math.random() * CIVIC_QUOTES.length)];

      await resend.emails.send({
        from: "Civics Please <support@civicsplease.gov>",
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
                Your infrastructure hazard report regarding <strong>${formData.category}</strong> has been securely logged into the municipal database and routed for review.
              </p>

              <div style="background-color: #000000; border: 1px solid rgba(74, 222, 128, 0.4); padding: 20px; text-align: center; margin: 30px 0; border-radius: 4px;">
                <span style="display: block; font-size: 10px; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your Tracking Reference ID</span>
                <span style="font-family: monospace; font-size: 28px; font-weight: bold; color: #4ade80; letter-spacing: 2px;">${trackingId}</span>
              </div>

              <div style="background-color: rgba(74, 222, 128, 0.05); border-left: 3px solid #4ade80; padding: 15px 20px; margin-bottom: 30px; font-style: italic; color: rgba(255, 255, 255, 0.8); font-size: 13px;">
                ${randomQuote}
              </div>

              <p style="color: rgba(255, 255, 255, 0.4); font-size: 11px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); pt-20px; margin-top: 30px;">
                This is an automated municipal dispatch notification. Please do not reply directly to this email.
              </p>

            </div>
          </div>
        `,
      });
    }

    return { success: true, trackingId: newReport.trackingId };
  } catch (error: any) {
    console.error("Database report creation or email dispatch error:", error);
    return { success: false, error: error?.message || "Failed to save report or dispatch confirmation email." };
  }
}