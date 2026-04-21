import type { OfferDomain, UserRole } from "../types/domain.js";

const validRoles: UserRole[] = ["admin", "client", "vet", "sales"];
const validDomains: OfferDomain[] = ["store", "service"];

export function validateRole(value: unknown): UserRole {
  if (typeof value !== "string" || !validRoles.includes(value as UserRole)) {
    throw new Error("Invalid role");
  }

  return value as UserRole;
}

export function validateOfferDomain(value: unknown): OfferDomain {
  if (typeof value !== "string" || !validDomains.includes(value as OfferDomain)) {
    throw new Error("Invalid offer domain");
  }

  return value as OfferDomain;
}

export function validateNonEmptyText(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length < 3) {
    throw new Error(`Invalid ${fieldName}`);
  }

  return value.trim();
}

export function validateUuid(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length < 10) {
    throw new Error(`Invalid ${fieldName}`);
  }

  return value.trim();
}

export function validateBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid ${fieldName}`);
  }

  return value;
}

