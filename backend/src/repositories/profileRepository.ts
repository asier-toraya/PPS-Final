import { supabaseAdmin } from "../lib/supabase.js";
import type { Profile, UserRole } from "../types/domain.js";

const table = "profiles";

export async function findProfileById(userId: string): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function upsertProfile(profile: Partial<Profile> & { id: string; email: string }): Promise<Profile> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .upsert(profile, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function listProfiles(): Promise<Profile[]> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .order("email", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function updateProfileRole(userId: string, role: UserRole): Promise<Profile> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .update({ role })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

