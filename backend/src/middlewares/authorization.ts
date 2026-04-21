import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/domain.js";
import { hasRole } from "../security/rbac.js";
import { sendError } from "../utils/http.js";

export function requireRoles(roles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      sendError(response, 401, "User not authenticated");
      return;
    }

    if (!hasRole(request.user, roles)) {
      sendError(response, 403, "Access denied by RBAC");
      return;
    }

    next();
  };
}

