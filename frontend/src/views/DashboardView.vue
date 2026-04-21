<script setup lang="ts">
import { computed } from "vue";
import AppShell from "../components/AppShell.vue";
import InfoCard from "../components/InfoCard.vue";
import RoleBadge from "../components/RoleBadge.vue";
import { useAuth } from "../composables/useAuth";

const { state } = useAuth();

const adoptionStatus = computed(() =>
  (state.profile?.adoptedPetCount ?? 0) > 0 ? "Con adopcion registrada" : "Sin adopcion registrada"
);
</script>

<template>
  <AppShell>
    <section class="dashboard-grid" v-if="state.profile">
      <article class="hero-card">
        <div class="hero-card-head">
          <div>
            <p class="eyebrow">Tu area</p>
            <h2>{{ state.profile.profile.full_name || state.profile.profile.email }}</h2>
          </div>
          <RoleBadge :role="state.profile.profile.role" />
        </div>

        <p class="muted">
          Consulta tu situacion actual y accede a las opciones disponibles segun tu perfil.
        </p>
      </article>

      <div class="card-row">
        <InfoCard title="Rol activo" :value="state.profile.profile.role" tone="accent" />
        <InfoCard title="Adopciones" :value="String(state.profile.adoptedPetCount)" />
        <InfoCard title="Estado de cliente" :value="adoptionStatus" />
      </div>

      <article class="panel">
        <h3>Resumen</h3>
        <ul class="clean-list">
          <li>Revisa tu acceso actual a tienda y servicios.</li>
          <li>Si ya has adoptado, podras ver ofertas exclusivas.</li>
          <li>El personal autorizado puede gestionar catalogo y registros.</li>
          <li>Los cambios de rol y adopcion se reflejan automaticamente.</li>
        </ul>
      </article>
    </section>
  </AppShell>
</template>
