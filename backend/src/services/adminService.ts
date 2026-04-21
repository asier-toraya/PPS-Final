import { createAdoption } from "../repositories/adoptionRepository.js";
import { listPets, markPetAsAdopted } from "../repositories/petRepository.js";
import { listProfiles, updateProfileRole } from "../repositories/profileRepository.js";
import type { UserRole } from "../types/domain.js";

export async function getAdminSummary() {
  const [profiles, pets] = await Promise.all([listProfiles(), listPets()]);

  return { profiles, pets };
}

export async function assignRole(userId: string, role: UserRole) {
  return updateProfileRole(userId, role);
}

export async function registerAdoption(clientId: string, petId: string) {
  const adoption = await createAdoption(clientId, petId);
  await markPetAsAdopted(petId);
  return adoption;
}
