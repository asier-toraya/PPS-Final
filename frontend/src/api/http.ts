import { supabase } from "./supabase";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({ error: "Request failed" }))) as { error?: string };
    throw new Error(payload.error ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

