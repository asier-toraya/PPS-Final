import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { sendError } from "./utils/http.js";

export function createApp() {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: false
    })
  );
  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: false
    })
  );
  app.use(express.json({ limit: "32kb" }));

  app.use("/api", apiRouter);

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    sendError(response, 400, message);
  });

  return app;
}

