
import { GoogleGenAI, Type } from "@google/genai";
import { PerformanceData, InsightReport } from "../types";

export const generateInsights = async (data: PerformanceData): Promise<InsightReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a Senior Amazon Brand Strategist, analyze the following performance data and generate a high-level executive report.
    
    Data:
    Timeframe: ${data.timeframe}
    Metrics: ${JSON.stringify(data.metrics)}
    Top Items: ${JSON.stringify(data.itemHighlights)}
    
    Focus on:
    1. A concise executive summary explaining the overall month-over-month performance.
    2. Key drivers for growth or decline.
    3. Actionable strategic recommendations for the upcoming quarter.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING },
          keyPositiveDrivers: { type: Type.ARRAY, items: { type: Type.STRING } },
          riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          strategicRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["executiveSummary", "keyPositiveDrivers", "riskFactors", "strategicRecommendations"]
      }
    }
  });

  return JSON.parse(response.text) as InsightReport;
};
