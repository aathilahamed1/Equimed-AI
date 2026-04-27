import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { symptoms, gender, ethnicity, age } = data;

    const prompt = `
    You are EquiMed AI, an advanced, ethical healthcare AI fairness auditor. 
    A standard medical AI has just analyzed the following patient data and provided a generic, potentially biased recommendation.
    
    PATIENT DATA:
    - Symptoms/Clinical Notes: ${symptoms}
    - Gender: ${gender || "Not specified"}
    - Ethnicity/Skin Tone/Cultural Context: ${ethnicity || "Not specified"}
    - Age: ${age || "Not specified"}
    
    YOUR TASK:
    Audit this scenario for potential demographic, proxy, or intersectional bias. 
    Then, provide the fairness correction pipeline.
    
    Make the response highly realistic, clinical, and specific to the exact symptoms and demographics provided.
    Ensure confOrig (original confidence) is lower than confNew (corrected confidence).
    Keep text concise, impactful, and ready for a UI dashboard.

    YOU MUST RESPOND ONLY WITH A VALID JSON OBJECT MATCHING THIS EXACT STRUCTURE:
    {
      "detection": {
        "question": "Is this decision likely biased?",
        "flag": "[Explain the potential bias here]"
      },
      "diagnosis": [
        "Root cause 1",
        "Root cause 2"
      ],
      "correction": {
        "a": "Correction step 1",
        "b": "Correction step 2",
        "c": "Correction step 3",
        "confOrig": "55%",
        "confNew": "92%"
      },
      "output": {
        "original": "Standard care pathway recommended.",
        "corrected": "Adjusted care pathway based on correction."
      }
    }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated");
    }

    const result = JSON.parse(text);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze data" }, { status: 500 });
  }
}
