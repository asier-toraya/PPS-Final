import type { Response } from "express";

export function sendError(response: Response, status: number, message: string): void {
  response.status(status).json({ error: message });
}

