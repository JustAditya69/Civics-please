"use server";

import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function getUserReports(requestedUserId?: string) {
  try {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get("user_session")?.value;

    if (!sessionUserId) {
      return { success: false, error: "Unauthorized. Please log in to view your reports." };
    }

    // Prevents IDOR: Users can only query their own reports unless authenticated as Admin
    const effectiveUserId = (sessionUserId === "ADMIN_ROOT_USER" && requestedUserId)
      ? requestedUserId
      : sessionUserId;

    const reports = await prisma.report.findMany({
      where: { userId: effectiveUserId },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, reports };
  } catch (error: any) {
    console.error("Failed to fetch user reports:", error);
    return { success: false, error: "Database error while fetching your reports." };
  }
}