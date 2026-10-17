// app/actions/ai.ts
"use server";

import { analyzeCivicIncident, AIAnalysisResult } from "@/app/lib/ai";

export async function triageIncidentWithAI(params: {
  title?: string;
  description?: string;
  category?: string;
  hasImage?: boolean;
}): Promise<{ success: boolean; data?: AIAnalysisResult; error?: string }> {
  try {
    const rawTitle = typeof params.title === "string" ? params.title.slice(0, 200) : "";
    const rawDesc = typeof params.description === "string" ? params.description.slice(0, 2000) : "";
    const rawCat = typeof params.category === "string" ? params.category.slice(0, 100) : "";

    const analysis = await analyzeCivicIncident({
      title: rawTitle,
      description: rawDesc,
      category: rawCat,
      hasImage: Boolean(params.hasImage),
    });

    return {
      success: true,
      data: analysis,
    };
  } catch (error: any) {
    console.error("AI triage error:", error);
    return {
      success: false,
      error: "AI analysis could not complete. Please fill in details manually.",
    };
  }
}
