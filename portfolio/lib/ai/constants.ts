// Shared by the /api/ask route and the client widget.

/** Exact phrase the model must use when the context doesn't cover the question. */
export const REFUSAL = "I don't have that — email Dharma";

export const STARTER_QUESTIONS = [
  "What is DStack?",
  "What's he building now?",
  "Is he open to internships?",
  "What's his tech stack?",
];

/** Response header carrying the source chip labels (URI-encoded JSON array). */
export const SOURCES_HEADER = "x-ask-sources";

export function isRefusal(answer: string): boolean {
  return answer.toLowerCase().replace(/’/g, "'").includes("i don't have that");
}
