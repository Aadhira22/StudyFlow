import { z } from "zod";

const FlashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const QuizQuestionSchema = z.object({
  question: z.string().min(1),

  options: z.array(z.string().min(1)).length(4),

  answer: z.number().int().min(0).max(3),

  explanation: z.string().min(1),
});

export const StudyMaterialSchema = z.object({
  flashcards: z.array(FlashcardSchema).length(6),
  quiz: z.array(QuizQuestionSchema).length(5),
});