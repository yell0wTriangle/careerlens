export async function apiFetch(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let body = text;

  try {
    body = JSON.parse(text);
  } catch {
    // keep non-JSON body as-is
  }

  if (!response.ok) {
    const message = body?.message || "Request failed.";
    const error = new Error(message);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

export const authApi = {
  register: (payload) => apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  verifyEmail: (payload) => apiFetch("/api/auth/verify-email", { method: "POST", body: JSON.stringify(payload) }),
  resendVerification: (payload) =>
    apiFetch("/api/auth/resend-verification", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => apiFetch("/api/auth/me", { method: "GET" }),
  updatePreferences: (payload) =>
    apiFetch("/api/auth/preferences", { method: "PATCH", body: JSON.stringify(payload) }),
  logout: () => apiFetch("/api/auth/logout", { method: "POST" }),
  refreshToken: () => apiFetch("/api/auth/refresh-token", { method: "POST" }),
};

export const onboardingApi = {
  create: (payload) => apiFetch("/api/onboarding", { method: "POST", body: JSON.stringify(payload) }),
  get: () => apiFetch("/api/onboarding", { method: "GET" }),
  update: (payload) => apiFetch("/api/onboarding", { method: "PUT", body: JSON.stringify(payload) }),
};

export const resumesApi = {
  list: () => apiFetch("/api/resumes", { method: "GET" }),
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch("/api/resumes/upload", { method: "POST", body: formData });
  },
  rename: (resumeId, displayName) =>
    apiFetch(`/api/resumes/${resumeId}`, {
      method: "PATCH",
      body: JSON.stringify({ displayName }),
    }),
  remove: (resumeId) => apiFetch(`/api/resumes/${resumeId}`, { method: "DELETE" }),
  getViewUrl: (resumeId) => apiFetch(`/api/resumes/${resumeId}/view-url`, { method: "GET" }),
};
