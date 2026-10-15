import { z } from "zod";

export const askSchema = z.object({
  question: z.string().trim().min(3, "Ask a slightly longer question.").max(300, "Keep it under 300 characters."),
});
export type AskInput = z.infer<typeof askSchema>;

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80);
