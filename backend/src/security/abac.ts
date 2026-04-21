import type { Offer, RequestUser } from "../types/domain.js";

export function canAccessExclusiveOffers(user: RequestUser): boolean {
  if (["admin", "sales", "vet"].includes(user.profile.role)) {
    return true;
  }

  return user.adoptedPetCount > 0;
}

export function filterOffersForUser(user: RequestUser, offers: Offer[]): Offer[] {
  if (canAccessExclusiveOffers(user)) {
    return offers;
  }

  return offers.filter((offer) => !offer.is_exclusive);
}

