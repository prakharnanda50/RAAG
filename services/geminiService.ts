import { GoogleGenAI, Type } from "@google/genai";
import { Track, MoodType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateRasaDescription = async (mood: MoodType): Promise<string> => {
  if (!ai) return `Immerse yourself in the essence of ${mood}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Describe the Indian Rasa (emotion) of "${mood}" in one poetic, evocative sentence suitable for a music app. Keep it under 20 words.`,
    });
    return response.text || `Experience the depth of ${mood}.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Experience the depth of ${mood}.`;
  }
};

export const suggestTracks = async (query: string): Promise<Partial<Track>[]> => {
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 5 Indian music tracks (Classical, Fusion, or Indie) that match this vibe: "${query}". Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              duration: { type: Type.STRING },
            }
          }
        }
      }
    });
    
    const jsonStr = response.text.trim();
    const result = JSON.parse(jsonStr);
    return result.map((t: any, i: number) => ({
        id: `gen-${i}`,
        title: t.title,
        artist: t.artist,
        duration: t.duration || '5:00',
        albumArt: `https://picsum.photos/400/400?random=${100+i}`,
        mood: []
    }));

  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return [];
  }
};
