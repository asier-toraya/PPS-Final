import { canAccessExclusiveOffers, filterOffersForUser } from "../security/abac.js";
import { canCreateOfferInDomain } from "../security/rbac.js";
import { createOffer, listOffers } from "../repositories/offerRepository.js";
import type { RequestUser } from "../types/domain.js";

export async function getVisibleOffers(user: RequestUser) {
  const offers = await listOffers();
  const visibleOffers = filterOffersForUser(user, offers);
  const canSeeExclusive = canAccessExclusiveOffers(user);

  return {
    items: visibleOffers,
    access: {
      canAccessExclusiveOffers: canSeeExclusive,
      reason: canSeeExclusive
        ? "Exclusive offers available."
        : "Debes haber adoptado una mascota para acceder a estas ofertas."
    }
  };
}

export async function createOfferForUser(
  user: RequestUser,
  input: { title: string; description: string; domain: "store" | "service"; isExclusive: boolean }
) {
  if (!canCreateOfferInDomain(user, input.domain)) {
    throw new Error("You are not allowed to create this type of offer");
  }

  return createOffer({
    ...input,
    createdBy: user.id
  });
}
