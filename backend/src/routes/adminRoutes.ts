import { Router } from "express";
import { requireAuth } from "../middlewares/authentication.js";
import { requireRoles } from "../middlewares/authorization.js";
import { assignRole, getAdminSummary, registerAdoption } from "../services/adminService.js";
import { validateRole, validateUuid } from "../utils/validators.js";

export const adminRoutes = Router();

adminRoutes.use(requireAuth, requireRoles(["admin"]));

adminRoutes.get("/summary", async (_request, response, next) => {
  try {
    response.json(await getAdminSummary());
  } catch (error) {
    next(error);
  }
});

adminRoutes.patch("/users/:userId/role", async (request, response, next) => {
  try {
    const profile = await assignRole(
      validateUuid(request.params.userId, "userId"),
      validateRole(request.body.role)
    );

    response.json({ item: profile });
  } catch (error) {
    next(error);
  }
});

adminRoutes.post("/adoptions", async (request, response, next) => {
  try {
    const adoption = await registerAdoption(
      validateUuid(request.body.clientId, "clientId"),
      validateUuid(request.body.petId, "petId")
    );

    response.status(201).json({ item: adoption });
  } catch (error) {
    next(error);
  }
});

