import { Router } from "express";
import { requireAuth } from "../middlewares/authentication.js";
import { createOfferForUser, getVisibleOffers } from "../services/offerService.js";
import {
  validateBoolean,
  validateNonEmptyText,
  validateOfferDomain
} from "../utils/validators.js";

export const offerRoutes = Router();

offerRoutes.get("/", requireAuth, async (request, response, next) => {
  try {
    const payload = await getVisibleOffers(request.user!);
    response.json(payload);
  } catch (error) {
    next(error);
  }
});

offerRoutes.post("/", requireAuth, async (request, response, next) => {
  try {
    const offer = await createOfferForUser(request.user!, {
      title: validateNonEmptyText(request.body.title, "title"),
      description: validateNonEmptyText(request.body.description, "description"),
      domain: validateOfferDomain(request.body.domain),
      isExclusive: validateBoolean(request.body.isExclusive, "isExclusive")
    });

    response.status(201).json({ item: offer });
  } catch (error) {
    next(error);
  }
});

