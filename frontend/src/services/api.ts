const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function authHeader() {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function uploadStatement(
  file: File,
  month: number,
  year: number,
  replace: boolean
) {
  const form = new FormData();
  form.append("file", file);

  const params = new URLSearchParams({
    month: String(month),
    year: String(year),
    replace: String(replace),
  });

  const res = await fetch(`${API_BASE}/statements/upload?${params.toString()}`, {
    method: "POST",
    body: form,
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    const error = new Error(detail || "Upload failed");
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
}

export async function getSummary(month: number, year: number) {
  const params = new URLSearchParams({
    month: String(month),
    year: String(year),
  });

  const res = await fetch(`${API_BASE}/summary?${params.toString()}`, {
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to fetch summary");
  }

  return res.json();
}

export async function getYearlySummary(year: number) {
  const params = new URLSearchParams({
    year: String(year),
  });

  const res = await fetch(`${API_BASE}/summary/yearly?${params.toString()}`, {
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to fetch yearly summary");
  }

  return res.json();
}

export async function getTransactions(month: number, year: number) {
  const params = new URLSearchParams({
    month: String(month),
    year: String(year),
  });

  const res = await fetch(`${API_BASE}/transactions?${params.toString()}`, {
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to fetch transactions");
  }

  return res.json();
}

export async function getYearlyTransactions(year: number, limit: number, offset: number) {
  const params = new URLSearchParams({
    year: String(year),
    limit: String(limit),
    offset: String(offset),
  });

  const res = await fetch(`${API_BASE}/transactions/yearly?${params.toString()}`, {
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to fetch yearly transactions");
  }

  return res.json();
}
