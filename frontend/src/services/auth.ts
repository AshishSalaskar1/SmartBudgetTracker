const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function authHeader() {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Login failed");
  }

  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    headers: { ...authHeader() },
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Logout failed");
  }
}

export async function me() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}
