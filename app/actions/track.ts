"use server";

import { prisma } from "@/app/lib/prisma";

export async function getReportByTrackingId(trackingId: string) {
  try {
    if (!trackingId || typeof trackingId !== "string") {
      return { success: false, error: "Please enter a valid tracking reference code." };
    }

    const sanitizedId = trackingId.trim();
    if (sanitizedId.length < 3 || sanitizedId.length > 50) {
      return { success: false, error: "Invalid tracking code format." };
    }

    const report = await prisma.report.findUnique({
      where: { trackingId: sanitizedId },
      select: {
        id: true,
        trackingId: true,
        category: true,
        title: true,
        description: true,
        imageUrl: true,
        latitude: true,
        longitude: true,
        address: true,
        priority: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
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