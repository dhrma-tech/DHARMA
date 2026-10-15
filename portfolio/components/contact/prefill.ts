/** Window event other widgets fire to pre-fill the contact form (e.g. Ask Dharma handoff). */
export const PREFILL_EVENT = "contact:prefill";

export interface PrefillDetail {
  message: string;
  source: "contact-form" | "ask-dharma-handoff";
}
