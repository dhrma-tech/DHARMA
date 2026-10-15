import "server-only";
import { Resend } from "resend";
import { site } from "@/data/site";
import type { ContactInput } from "@/lib/schemas";

let resend: Resend | null | undefined;

function getResend(): Resend | null {
  if (resend === undefined) resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  return resend;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Emails a contact-form message to Dharma, with reply-to set to the sender. Throws on failure. */
export async function sendContactEmail(msg: Pick<ContactInput, "name" | "email" | "message" | "source">) {
  const client = getResend();
  if (!client) throw new Error("RESEND_API_KEY is not set");
  // Plain text only: nothing the sender typed is ever rendered as HTML.
  const { error } = await client.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || site.email,
    replyTo: msg.email,
    subject: `Portfolio message from ${msg.name.replace(/[\r\n]+/g, " ")}`,
    text: `${msg.message}\n\n— ${msg.name} <${msg.email}>\nvia ${msg.source ?? "contact-form"} on ${site.siteUrl}`,
  });
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
}
