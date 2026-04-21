import type { NextFunction, Request, Response } from "express";
import { supabaseAuth } from "../lib/supabase.js";
import { ensureRequestUser } from "../services/profileService.js";
import { sendError } from "../utils/http.js";

function extractBearerToken(request: Request): string | null {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.replace("Bearer ", "").trim();
}

export async function requireAuth(request: Request, response: Response, next: NextFunction) {
  try {
    const accessToken = extractBearerToken(request);
    if (!accessToken) {
      sendError(response, 401, "Missing bearer token");
      return;
    }

    const { data, error } = await supabaseAuth.auth.getUser(accessToken);

    if (error || !data.user?.email) {
      sendError(response, 401, "Invalid access token");
      return;
    }

    request.user = await ensureRequestUser(
      {
        id: data.user.id,
        email: data.user.email
      },
      typeof data.user.user_metadata.full_name === "string"
        ? data.user.user_metadata.full_name
        : null
    );

    next();
  } catch (error) {
    sendError(response, 500, error instanceof Error ? error.message : "Authentication error");
  }
}

