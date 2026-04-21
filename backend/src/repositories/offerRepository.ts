import { supabaseAdmin } from "../lib/supabase.js";
import type { Offer, OfferDomain } from "../types/domain.js";

const table = "offers";

export async function listOffers(): Promise<Offer[]> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .order("is_exclusive", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createOffer(input: {
  title: string;
  description: string;
  domain: OfferDomain;
  isExclusive: boolean;
  createdBy: string;
}): Promise<Offer> {
  const { data, error } = await supabaseAdmin
    .from(table)
    .insert({
      title: input.title,
      description: input.description,
      domain: input.domain,
      is_exclusive: input.isExclusive,
      created_by: input.createdBy
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

