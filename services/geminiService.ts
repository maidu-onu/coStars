import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Movie } from "../types";

// Initialize Gemini client
// Note: API Key is strictly pulled from process.env.API_KEY as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const movieSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The official title of the movie." },
    year: { type: Type.INTEGER, description: "The release year of the movie." },
    roleActor1: { type: Type.STRING, description: "The character name or role played by the first actor." },
    roleActor2: { type: Type.STRING, description: "The character name or role played by the second actor." },
    description: { type: Type.STRING, description: "A brief 1-sentence plot summary of the movie." },
    genre: { type: Type.STRING, description: "The primary genre of the movie." },
  },
  required: ["title", "year", "roleActor1", "roleActor2", "description", "genre"],
};

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: movieSchema,
};

export const findCommonMovies = async (actor1: string, actor2: string): Promise<Movie[]> => {
  if (!actor1 || !actor2) {
    throw new Error("Both actor names are required.");
  }

  try {
    const prompt = `
      Identify all feature films (movies) where "${actor1}" and "${actor2}" have both appeared in the cast.
      Do not include TV shows, documentaries, or talk shows unless they are feature-length films.
      If they have not appeared in any movies together, return an empty array.
      Provide the role or character name for each actor if known, otherwise state "Unknown".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Low temperature for factual accuracy
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const movies = JSON.parse(jsonText) as Movie[];
    // Sort by year descending
    return movies.sort((a, b) => b.year - a.year);

  } catch (error) {
    console.error("Error fetching movies from Gemini:", error);
    throw new Error("Failed to find movies. Please try again or check the actor names.");
  }
};