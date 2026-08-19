"use server";

import { prisma } from "@/app/lib/prisma";

export async function getUserReports(userId: string) {
  try {
    if (!userId || userId.trim() === "") {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const reports = await prisma.report.findMany({
      where: { userId: userId.trim() },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, reports };
  } catch (error: any) {
    console.error("Failed to fetch user reports:", error);
    return { success: false, error: "Database error while fetching your reports." };
  }
}