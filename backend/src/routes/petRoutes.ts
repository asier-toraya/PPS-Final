import { Router } from "express";
import { requireAuth } from "../middlewares/authentication.js";
import { listAvailablePets } from "../repositories/petRepository.js";

export const petRoutes = Router();

petRoutes.get("/", requireAuth, async (_request, response, next) => {
  try {
    const pets = await listAvailablePets();
    response.json({ items: pets });
  } catch (error) {
    next(error);
  }
});

