export type UserRole = "admin" | "client" | "vet" | "sales";
export type OfferDomain = "store" | "service";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
}

export interface MeResponse {
  profile: Profile;
  adoptedPetCount: number;
  permissions: {
    canManageAdminData: boolean;
    canCreateStoreOffers: boolean;
    canCreateServiceOffers: boolean;
  };
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  domain: OfferDomain;
  is_exclusive: boolean;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  is_adopted: boolean;
}

export interface OfferResponse {
  items: Offer[];
  access: {
    canAccessExclusiveOffers: boolean;
    reason: string;
  };
}

export interface AdminSummary {
  profiles: Profile[];
  pets: Pet[];
}

