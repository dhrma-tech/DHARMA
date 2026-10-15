import { z } from "zod";

// Limits mirror the CHECK constraints in supabase/migrations.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(100),
  email: z.email("That email doesn't look right.").max(200),
  message: z.string().trim().min(10, "A little more detail, please (10+ characters).").max(4000),
  /** Honeypot: hidden from humans, bots fill it. */
  website: z.string().max(200).optional(),
  source: z.enum(["contact-form", "ask-dharma-handoff"]).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const askSchema = z.object({
  question: z.string().trim().min(3, "Ask a slightly longer question.").max(300, "Keep it under 300 characters."),
});
export type AskInput = z.infer<typeof askSchema>;

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80);
