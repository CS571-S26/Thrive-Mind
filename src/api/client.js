const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Thin fetch wrapper: always sends the session cookie, always parses JSON,
// always throws a real Error (with the server's message) on a non-2xx
// response instead of leaving callers to check res.ok themselves.
export async function apiRequest(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || "Something went wrong.", res.status);
  }

  return data;
}
