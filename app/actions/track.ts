"use server";

import { prisma } from "@/app/lib/prisma";

export async function getReportByTrackingId(trackingId: string) {
  try {
    const report = await prisma.report.findUnique({
      where: { trackingId: trackingId.trim() },
    });

    if (!report) {
      return { success: false, error: "No incident report found with this tracking ID." };
    }

    return { success: true, report };
  } catch (error: any) {
    console.error("Tracking lookup error:", error);
    return { success: false, error: "Database error while fetching tracking details." };
  }
}