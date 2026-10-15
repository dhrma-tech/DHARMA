/** Structured server error log — one JSON line, searchable in Vercel logs. */
export function logError(route: string, code: string, detail?: unknown) {
  const message = detail instanceof Error ? detail.message : detail === undefined ? undefined : String(detail);
  console.error(JSON.stringify({ level: "error", route, code, message, at: new Date().toISOString() }));
}
