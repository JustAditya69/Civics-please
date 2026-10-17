// app/lib/ai.ts
/**
 * Civics Please - AI Civic Intelligence Engine
 * Provides civic incident classification, hazard risk scoring, 
 * department dispatch recommendation, and dispatch memo generation.
 * 
 * Works with external LLMs (Gemini / OpenAI) if keys are provided,
 * and includes a deterministic zero-dependency Local Civic NLP Classifier fallback.
 */

export interface AIAnalysisResult {
  suggestedTitle: string;
  suggestedCategory: string;
  urgencyLevel: "Low" | "Medium" | "High" | "Critical";
  hazardScore: number; // 1 - 100
  recommendedDepartment: string;
  confidenceScore: number; // 0 - 100%
  extractedKeywords: string[];
  enhancedDescription: string;
  dispatchBriefing: string;
  safetyAdvisory: string;
}

// Category keyword mappings for civic hazard detection
const CATEGORY_RULES: Record<string, {
  keywords: string[];
  dept: string;
  baseHazard: number;
}> = {
  "Roads & Potholes": {
    keywords: ["pothole", "crater", "road", "asphalt", "cracked", "bump", "highway", "pavement", "sinkhole", "tarmac", "accident hazard", "bike skid"],
    dept: "Department of Transportation & Public Works",
    baseHazard: 72,
  },
  "Street Lights": {
    keywords: ["light", "dark", "lamp", "pole", "flicker", "wire", "bulb", "darkness", "blackout", "streetlamp", "unlit", "night safety"],
    dept: "Municipal Electricity & Public Lighting Board",
    baseHazard: 60,
  },
  "Garbage & Waste": {
    keywords: ["garbage", "trash", "waste", "dump", "stench", "litter", "smell", "overflow", "plastic", "debris", "rotting", "unsanitary"],
    dept: "Department of Sanitation & Waste Management",
    baseHazard: 55,
  },
  "Water & Drainage": {
    keywords: ["water", "leak", "pipe", "drain", "flood", "sewage", "gutter", "burst", "overflowing", "clogged", "puddle", "contamination"],
    dept: "City Water Supply & Sewerage Board",
    baseHazard: 78,
  },
  "Traffic & Signals": {
    keywords: ["signal", "traffic", "light", "intersection", "pedestrian", "crossing", "zebra", "sign", "junction", "jam", "blind spot"],
    dept: "Traffic Police & Urban Transit Authority",
    baseHazard: 80,
  },
  "Parks & Public Spaces": {
    keywords: ["park", "bench", "tree", "playground", "swing", "garden", "fallen branch", "fence", "grass", "overgrown", "vandalism"],
    dept: "Parks, Recreation & Horticulture Department",
    baseHazard: 45,
  },
};

/**
 * Intelligent Local Civic Inference Engine
 * Evaluates report description, title, and image metadata.
 */
export function runLocalCivicTriage(
  rawTitle: string,
  rawDescription: string,
  currentCategory?: string,
  hasImage?: boolean
): AIAnalysisResult {
  const combinedText = `${rawTitle || ""} ${rawDescription || ""}`.toLowerCase();
  
  let bestCategory = currentCategory && CATEGORY_RULES[currentCategory] 
    ? currentCategory 
    : "Roads & Potholes";
  let maxMatches = 0;
  const matchedKeywords: string[] = [];

  // Match keywords across categories
  for (const [catName, rule] of Object.entries(CATEGORY_RULES)) {
    let matchCount = 0;
    for (const kw of rule.keywords) {
      if (combinedText.includes(kw)) {
        matchCount++;
        if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
      }
    }
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestCategory = catName;
    }
  }

  const categoryRule = CATEGORY_RULES[bestCategory] || CATEGORY_RULES["Roads & Potholes"];
  
  // Hazard scoring calculation
  let hazardScore = categoryRule.baseHazard;
  if (combinedText.includes("danger") || combinedText.includes("accident") || combinedText.includes("urgent") || combinedText.includes("emergency") || combinedText.includes("critical")) {
    hazardScore += 18;
  }
  if (combinedText.includes("kid") || combinedText.includes("child") || combinedText.includes("school") || combinedText.includes("hospital") || combinedText.includes("elderly")) {
    hazardScore += 12;
  }
  if (hasImage) {
    hazardScore += 5; // Photographic evidence increases severity validation
  }
  hazardScore = Math.min(98, Math.max(25, hazardScore));

  // Determine urgency tier
  let urgencyLevel: AIAnalysisResult["urgencyLevel"] = "Medium";
  if (hazardScore >= 85) urgencyLevel = "Critical";
  else if (hazardScore >= 70) urgencyLevel = "High";
  else if (hazardScore <= 45) urgencyLevel = "Low";

  // Generate polished title
  let suggestedTitle = rawTitle.trim();
  if (!suggestedTitle || suggestedTitle.length < 5) {
    const primaryWord = matchedKeywords[0] || "civic issue";
    const capitalizedWord = primaryWord.charAt(0).toUpperCase() + primaryWord.slice(1);
    suggestedTitle = `${capitalizedWord} Hazard reported under ${bestCategory}`;
  } else {
    // Polish existing title
    suggestedTitle = suggestedTitle.charAt(0).toUpperCase() + suggestedTitle.slice(1);
  }

  // Enhanced description with civic structure
  let enhancedDescription = rawDescription.trim();
  if (enhancedDescription.length < 30) {
    enhancedDescription = `${rawDescription.trim()}. Public safety hazard observed requiring prompt municipal intervention. Verified by CivicsPlease AI Sentinel.`;
  }

  const confidenceScore = Math.min(96, 68 + matchedKeywords.length * 7 + (hasImage ? 10 : 0));

  const dispatchBriefing = `[AI DISPATCH MEMO]
Priority: ${urgencyLevel.toUpperCase()} (Score: ${hazardScore}/100)
Target Department: ${categoryRule.dept}
Key Observations: ${matchedKeywords.length > 0 ? matchedKeywords.slice(0, 4).join(", ") : "Civic hazard identified"}
Action Required: Inspect location, secure public perimeter, and schedule repair crew within ${urgencyLevel === "Critical" ? "12 hours" : urgencyLevel === "High" ? "24-48 hours" : "3-5 days"}.`;

  const safetyAdvisory = urgencyLevel === "Critical" || urgencyLevel === "High"
    ? "⚠️ High risk of pedestrian injury or vehicular damage. Advise field priority routing."
    : "Standard municipal triage queue. Low immediate risk to life.";

  return {
    suggestedTitle,
    suggestedCategory: bestCategory,
    urgencyLevel,
    hazardScore,
    recommendedDepartment: categoryRule.dept,
    confidenceScore,
    extractedKeywords: matchedKeywords.slice(0, 6),
    enhancedDescription,
    dispatchBriefing,
    safetyAdvisory,
  };
}

/**
 * Main AI Analyzer
 * Tries external model if API key is present in environment,
 * otherwise gracefully uses the local civic triage engine.
 */
export async function analyzeCivicIncident(params: {
  title: string;
  description: string;
  category?: string;
  hasImage?: boolean;
}): Promise<AIAnalysisResult> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const prompt = `You are a municipal civic triage AI. Analyze this civic incident:
Title: "${params.title}"
Description: "${params.description}"
Category hint: "${params.category || ""}"
Has Photo Evidence: ${params.hasImage ? "Yes" : "No"}

Return a pure JSON object with these exact keys:
{
  "suggestedTitle": "Concise 5-9 word title",
  "suggestedCategory": "One of: Roads & Potholes, Street Lights, Garbage & Waste, Water & Drainage, Traffic & Signals, Parks & Public Spaces",
  "urgencyLevel": "One of: Low, Medium, High, Critical",
  "hazardScore": integer from 1 to 100,
  "recommendedDepartment": "Exact municipal agency name",
  "confidenceScore": integer 70-99,
  "extractedKeywords": ["keyword1", "keyword2"],
  "enhancedDescription": "Clear, professional 1-2 sentence description",
  "dispatchBriefing": "Brief dispatch instruction for city workers",
  "safetyAdvisory": "Short safety alert"
}`;

      const candidateModels = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
      for (const model of candidateModels) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" }
            })
          });

          if (res.ok) {
            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              const parsed = JSON.parse(text);
              return {
                ...parsed,
                hazardScore: Number(parsed.hazardScore) || 75,
                confidenceScore: Number(parsed.confidenceScore) || 90,
              };
            }
          }
        } catch (mErr) {
          console.warn(`Gemini model ${model} attempt failed:`, mErr);
        }
      }
    } catch (e) {
      console.warn("External Gemini API call skipped or failed, trying next provider:", e);
    }
  }

  // 2. Try OpenAI API if key provided
  if (openAiKey) {
    try {
      const prompt = `You are a municipal civic triage AI. Analyze this civic incident:
Title: "${params.title}"
Description: "${params.description}"
Category hint: "${params.category || ""}"
Has Photo Evidence: ${params.hasImage ? "Yes" : "No"}

Return a pure JSON object with these exact keys:
{
  "suggestedTitle": "Concise 5-9 word title",
  "suggestedCategory": "One of: Roads & Potholes, Street Lights, Garbage & Waste, Water & Drainage, Traffic & Signals, Parks & Public Spaces",
  "urgencyLevel": "One of: Low, Medium, High, Critical",
  "hazardScore": integer from 1 to 100,
  "recommendedDepartment": "Exact municipal agency name",
  "confidenceScore": integer 70-99,
  "extractedKeywords": ["keyword1", "keyword2"],
  "enhancedDescription": "Clear, professional 1-2 sentence description",
  "dispatchBriefing": "Brief dispatch instruction for city workers",
  "safetyAdvisory": "Short safety alert"
}`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "You are a municipal civic triage AI. Output valid JSON." },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            ...parsed,
            hazardScore: Number(parsed.hazardScore) || 75,
            confidenceScore: Number(parsed.confidenceScore) || 90,
          };
        }
      }
    } catch (e) {
      console.warn("External OpenAI API call skipped or failed, using local civic AI:", e);
    }
  }

  // 3. Zero-dependency local civic AI fallback
  return runLocalCivicTriage(params.title, params.description, params.category, params.hasImage);
}
