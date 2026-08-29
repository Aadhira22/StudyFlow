import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateStudyMaterial(topic) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: `
      Create a study set about the following topic:

      ${topic}

      Generate:
      - exactly 6 flashcards
      - exactly 5 multiple-choice quiz questions

      FLASHCARDS:
      Each flashcard must have:
      - question
      - answer

      QUIZ:
      Each quiz question must have:
      - question
      - exactly 4 options
      - correct answer as the index of the option (0, 1, 2, or 3)
      - a short explanation of why the correct answer is correct

      Make the questions educational and factually accurate.
    `,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          flashcards: {
            type: "array",
            items: {
              type: "object",

              properties: {
                question: {
                  type: "string",
                },

                answer: {
                  type: "string",
                },
              },

              required: ["question", "answer"],
            },
          },

          quiz: {
            type: "array",

            items: {
              type: "object",

              properties: {
                question: {
                  type: "string",
                },

                options: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                answer: {
                  type: "integer",
                },

                explanation: {
                  type: "string",
                },
              },

              required: [
                "question",
                "options",
                "answer",
                "explanation",
              ],
            },
          },
        },

        required: ["flashcards", "quiz"],
      },
    },
  });

  return JSON.parse(response.text);
}