import { supabaseAdmin } from "../lib/supabase.js";
import type { Adoption } from "../types/domain.js";

const table = "adoptions";

export async function countAdoptionsByClient(userId: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("client_id", userId);

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function listAdoptionsByClient(userId: string): Promise<Adoption[]> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .eq("client_id", userId)
    .order("adopted_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createAdoption(clientId: string, petId: string): Promise<Adoption> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .insert({
      client_id: clientId,
      pet_id: petId
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

