import { env } from "../config/env.js";
import { countAdoptionsByClient } from "../repositories/adoptionRepository.js";
import { findProfileById, upsertProfile } from "../repositories/profileRepository.js";
import type { AuthUserContext, Profile, RequestUser, UserRole } from "../types/domain.js";

function resolveBootstrapRole(email: string): UserRole {
  return email.toLowerCase() === env.bootstrapAdminEmail ? "admin" : "client";
}

export async function ensureRequestUser(authUser: AuthUserContext, fullName: string | null): Promise<RequestUser> {
  const existingProfile = await findProfileById(authUser.id);

  const profile: Profile = existingProfile
    ? existingProfile
    : await upsertProfile({
        id: authUser.id,
        email: authUser.email,
        full_name: fullName,
        role: resolveBootstrapRole(authUser.email)
      });

  const adoptedPetCount = await countAdoptionsByClient(authUser.id);

  return {
    ...authUser,
    profile,
    adoptedPetCount
  };
}

