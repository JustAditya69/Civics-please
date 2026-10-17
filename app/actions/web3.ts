// app/actions/web3.ts
"use server";

import { prisma } from "@/app/lib/prisma";
import { getReportOnChainProof, OnChainProof } from "@/app/lib/web3";

export async function verifyReportOnChain(trackingId: string): Promise<{
  success: boolean;
  proof?: OnChainProof;
  error?: string;
}> {
  try {
    if (!trackingId || typeof trackingId !== "string") {
      return { success: false, error: "Invalid tracking ID" };
    }

    const report = await prisma.report.findUnique({
      where: { trackingId: trackingId.trim() },
      select: {
        trackingId: true,
        title: true,
        category: true,
        status: true,
        createdAt: true,
      },
    });

    if (!report) {
      return { success: false, error: "Report not found" };
    }

    const proof = getReportOnChainProof(report);
    return { success: true, proof };
  } catch (error: any) {
    console.error("Web3 on-chain proof verification error:", error);
    return { success: false, error: "Failed to verify on-chain ledger proof." };
  }
}
