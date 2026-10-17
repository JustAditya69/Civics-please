"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Server-side check for administrative session
async function verifyAdminAuth() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("user_session")?.value;
    return session === "ADMIN_ROOT_USER";
  } catch {
    return false;
  }
}

export async function getAllAdminReports() {
  try {
    if (!(await verifyAdminAuth())) {
      return { success: false, error: "Unauthorized access: Administrative session required." };
    }

    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, reports };
  } catch (error: any) {
    console.error("Failed to fetch admin reports:", error);
    return { success: false, error: "Database error while fetching reports." };
  }
}

export async function updateReportStatus(reportId: string, newStatus: string) {
  try {
    if (!(await verifyAdminAuth())) {
      return { success: false, error: "Unauthorized access: Administrative session required." };
    }

    const allowedStatuses = ["AWAITING_REVIEW", "IN_PROGRESS", "RESOLVED"];
    if (!allowedStatuses.includes(newStatus)) {
      return { success: false, error: "Invalid status value provided." };
    }

    const updated = await prisma.report.update({
      where: { id: reportId },
      data: { status: newStatus },
    });

    revalidatePath("/admin");
    return { success: true, updated };
  } catch (error: any) {
    console.error("Failed to update report status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

// Dispatch report to a specific authority
export async function dispatchToAuthority(reportId: string, authorityEmail: string, authorityName: string) {
  try {
    if (!(await verifyAdminAuth())) {
      return { success: false, error: "Unauthorized access: Administrative session required." };
    }

    const report = await prisma.report.findUnique({
      where: { id: reportId }
    });

    if (!report) return { success: false, error: "Report not found." };

    const mapsLink = `https://www.google.com/maps?q=${report.latitude},${report.longitude}`;

    try {
      await resend.emails.send({
        from: "Civics Please Dispatch <onboarding@resend.dev>",
        to: authorityEmail,
        subject: `URGENT DISPATCH: [${report.trackingId}] ${report.category} Issue`,
        html: `
          <div style="font-family: monospace; background-color: #050806; color: #ffffff; padding: 30px;">
            <h2 style="color: #ef4444;">DISPATCH ORDER: ${authorityName}</h2>
            <p>You have been assigned a new civic incident for immediate review.</p>
            <hr style="border-color: #333;" />
            <p><strong>Tracking ID:</strong> ${report.trackingId}</p>
            <p><strong>Category:</strong> ${report.category}</p>
            <p><strong>Priority:</strong> ${report.priority}</p>
            <p><strong>Title:</strong> ${report.title}</p>
            <p><strong>Description:</strong> ${report.description}</p>
            <br/>
            <h3 style="color: #4ade80;">LOCATION DATA</h3>
            <p><strong>Address:</strong> ${report.address || "No text address provided"}</p>
            <p><strong>Coordinates:</strong> ${report.latitude}, ${report.longitude}</p>
            <a href="${mapsLink}" style="background-color: #4ade80; color: #000; padding: 10px 20px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 10px;">
              OPEN IN GOOGLE MAPS
            </a>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Dispatch email warning:", emailErr);
    }

    // Update status to IN_PROGRESS since it has been dispatched
    await prisma.report.update({
      where: { id: reportId },
      data: { status: "IN_PROGRESS" }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Dispatch error:", error);
    return { success: false, error: "Failed to process dispatch action." };
  }
}

// Fetch all contact queries for the admin dashboard
export async function getAdminQueries() {
  try {
    if (!(await verifyAdminAuth())) {
      return { success: false, error: "Unauthorized access: Administrative session required." };
    }

    const queries = await prisma.contactQuery.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, queries };
  } catch (error: any) {
    console.error("Failed to fetch queries:", error);
    return { success: false, error: "Database error while fetching queries." };
  }
}

// Update the status of a contact query (e.g., mark as read or resolved)
export async function updateQueryStatus(queryId: string, newStatus: string) {
  try {
    if (!(await verifyAdminAuth())) {
      return { success: false, error: "Unauthorized access: Administrative session required." };
    }

    const allowedStatuses = ["UNREAD", "READ", "RESOLVED"];
    if (!allowedStatuses.includes(newStatus)) {
      return { success: false, error: "Invalid status value provided." };
    }

    const updated = await prisma.contactQuery.update({
      where: { id: queryId },
      data: { status: newStatus },
    });
    revalidatePath("/admin");
    return { success: true, updated };
  } catch (error: any) {
    console.error("Failed to update query status:", error);
    return { success: false, error: "Failed to update query status." };
  }
}