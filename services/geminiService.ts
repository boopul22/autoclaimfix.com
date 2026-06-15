import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const assessClaim = async (
  claimType: string,
  description: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock response.");
    return "Thank you for your submission. Our team will review your details and get back to you shortly.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview";

    const prompt = `
      You are an expert AI legal assistant for a UK-based claims management company called "autoclaimfix.com".
      A user has submitted a new claim inquiry.
      
      Claim Type: ${claimType}
      Description: ${description}
      
      Please provide a polite, professional, and empathetic preliminary response (max 80 words). 
      1. Acknowledge the distress or inconvenience.
      2. Briefly mention based on the description if this sounds like something typically reviewable (do not give binding legal advice).
      3. Assure them a human specialist will contact them within 24 hours.
      
      Tone: Professional, reassuring, British English.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Thank you. We have received your claim details.";
  } catch (error) {
    console.error("Error assessing claim:", error);
    return "Thank you. We have received your claim details and a specialist will contact you shortly.";
  }
};