import { Router } from "express";
import { requireAuth } from "../middlewares/authentication.js";
import { canCreateOfferInDomain } from "../security/rbac.js";

export const meRoutes = Router();

meRoutes.get("/", requireAuth, async (request, response) => {
  const user = request.user!;

  response.json({
    profile: user.profile,
    adoptedPetCount: user.adoptedPetCount,
    permissions: {
      canManageAdminData: user.profile.role === "admin",
      canCreateStoreOffers: canCreateOfferInDomain(user, "store"),
      canCreateServiceOffers: canCreateOfferInDomain(user, "service")
    }
  });
});

