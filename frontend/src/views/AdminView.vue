<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { apiFetch } from "../api/http";
import AppShell from "../components/AppShell.vue";
import type { AdminSummary, UserRole } from "../types/app";

const admin = reactive<{
  loading: boolean;
  error: string | null;
  summary: AdminSummary | null;
  selectedUserId: string;
  selectedRole: UserRole;
  adoptionClientId: string;
  adoptionPetId: string;
}>({
  loading: true,
  error: null,
  summary: null,
  selectedUserId: "",
  selectedRole: "client",
  adoptionClientId: "",
  adoptionPetId: ""
});

async function loadSummary() {
  admin.loading = true;

  try {
    admin.summary = await apiFetch<AdminSummary>("/admin/summary");
    admin.error = null;
  } catch (error) {
    admin.error = error instanceof Error ? error.message : "No se pudo cargar el panel admin";
  } finally {
    admin.loading = false;
  }
}

async function updateRole() {
  if (!admin.selectedUserId) {
    admin.error = "Selecciona un usuario";
    return;
  }

  try {
    await apiFetch(`/admin/users/${admin.selectedUserId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role: admin.selectedRole })
    });
    await loadSummary();
  } catch (error) {
    admin.error = error instanceof Error ? error.message : "No se pudo actualizar el rol";
  }
}

async function registerAdoption() {
  if (!admin.adoptionClientId || !admin.adoptionPetId) {
    admin.error = "Selecciona cliente y mascota";
    return;
  }

  try {
    await apiFetch("/admin/adoptions", {
      method: "POST",
      body: JSON.stringify({
        clientId: admin.adoptionClientId,
        petId: admin.adoptionPetId
      })
    });
    await loadSummary();
  } catch (error) {
    admin.error = error instanceof Error ? error.message : "No se pudo registrar la adopcion";
  }
}

onMounted(loadSummary);
</script>

<template>
  <AppShell>
    <section class="stack">
      <article class="panel">
        <p class="eyebrow">Administracion</p>
        <h2>Roles y adopciones</h2>
        <p class="muted">
          Gestiona los accesos del equipo y registra adopciones de clientes.
        </p>
      </article>

      <p v-if="admin.loading" class="state-text">Cargando panel...</p>
      <p v-else-if="admin.error" class="state-text error">{{ admin.error }}</p>

      <template v-else-if="admin.summary">
        <article class="panel">
          <h3>Asignar rol</h3>
          <div class="form-grid">
            <select v-model="admin.selectedUserId" class="input">
              <option value="">Selecciona usuario</option>
              <option v-for="profile in admin.summary.profiles" :key="profile.id" :value="profile.id">
                {{ profile.email }} - {{ profile.role }}
              </option>
            </select>
            <select v-model="admin.selectedRole" class="input">
              <option value="admin">admin</option>
              <option value="client">client</option>
              <option value="vet">vet</option>
              <option value="sales">sales</option>
            </select>
            <button class="button primary" type="button" @click="updateRole">Actualizar rol</button>
          </div>
        </article>

        <article class="panel">
          <h3>Registrar adopcion</h3>
          <div class="form-grid">
            <select v-model="admin.adoptionClientId" class="input">
              <option value="">Selecciona cliente</option>
              <option
                v-for="profile in admin.summary.profiles.filter((item) => item.role === 'client')"
                :key="profile.id"
                :value="profile.id"
              >
                {{ profile.email }}
              </option>
            </select>
            <select v-model="admin.adoptionPetId" class="input">
              <option value="">Selecciona mascota</option>
              <option
                v-for="pet in admin.summary.pets.filter((item) => !item.is_adopted)"
                :key="pet.id"
                :value="pet.id"
              >
                {{ pet.name }} - {{ pet.species }}
              </option>
            </select>
            <button class="button primary" type="button" @click="registerAdoption">
              Registrar adopcion
            </button>
          </div>
        </article>
      </template>
    </section>
  </AppShell>
</template>
