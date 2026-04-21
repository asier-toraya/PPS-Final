import type { OfferDomain, RequestUser, UserRole } from "../types/domain.js";

export function hasRole(user: RequestUser, roles: UserRole[]): boolean {
  return roles.includes(user.profile.role);
}

export function canManageAdminData(user: RequestUser): boolean {
  return user.profile.role === "admin";
}

export function canCreateOfferInDomain(user: RequestUser, domain: OfferDomain): boolean {
  if (user.profile.role === "admin") {
    return true;
  }

  if (user.profile.role === "sales") {
    return domain === "store";
  }

  if (user.profile.role === "vet") {
    return domain === "service";
  }

  return false;
}

