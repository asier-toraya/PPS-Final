import { supabaseAdmin } from "../lib/supabase.js";
import type { Pet } from "../types/domain.js";

const table = "pets";

export async function listAvailablePets(): Promise<Pet[]> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .eq("is_adopted", false)
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function listPets(): Promise<Pet[]> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function markPetAsAdopted(petId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from(table)
    .update({ is_adopted: true })
    .eq("id", petId);

  if (error) {
    throw error;
  }
}

