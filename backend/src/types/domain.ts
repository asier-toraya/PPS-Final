export type UserRole = "admin" | "client" | "vet" | "sales";
export type OfferDomain = "store" | "service";

export interface AuthUserContext {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  is_adopted: boolean;
}

export interface Adoption {
  id: string;
  client_id: string;
  pet_id: string;
  adopted_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  domain: OfferDomain;
  is_exclusive: boolean;
  created_by: string;
}

export interface RequestUser extends AuthUserContext {
  profile: Profile;
  adoptedPetCount: number;
}

