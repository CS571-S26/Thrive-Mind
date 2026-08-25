import { apiRequest } from "./client.js";

export const signup = (email, password, displayName) =>
  apiRequest("/api/auth/signup", {
    method: "POST",
    body: { email, password, displayName }
  }).then((data) => data.user);

export const login = (email, password) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: { email, password }
  }).then((data) => data.user);

export const logout = () => apiRequest("/api/auth/logout", { method: "POST" });

// Returns null (rather than throwing) when there's no active session, since
// "not signed in" is an expected, common state — not an error condition.
export const getCurrentUser = async () => {
  try {
    const data = await apiRequest("/api/auth/me");
    return data.user;
  } catch {
    return null;
  }
};
