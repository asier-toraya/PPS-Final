import { Router } from "express";
import { adminRoutes } from "./adminRoutes.js";
import { healthRoutes } from "./healthRoutes.js";
import { meRoutes } from "./meRoutes.js";
import { offerRoutes } from "./offerRoutes.js";
import { petRoutes } from "./petRoutes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/me", meRoutes);
apiRouter.use("/offers", offerRoutes);
apiRouter.use("/pets", petRoutes);
apiRouter.use("/admin", adminRoutes);

