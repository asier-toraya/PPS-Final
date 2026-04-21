<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { apiFetch } from "../api/http";
import AppShell from "../components/AppShell.vue";
import OfferCard from "../components/OfferCard.vue";
import { useAuth } from "../composables/useAuth";
import type { OfferResponse, OfferDomain } from "../types/app";

const { state, refreshProfile } = useAuth();

const catalog = reactive<{
  loading: boolean;
  error: string | null;
  payload: OfferResponse | null;
}>({
  loading: true,
  error: null,
  payload: null
});

const form = reactive({
  title: "",
  description: "",
  domain: "store" as OfferDomain,
  isExclusive: false
});

watch(
  () => state.profile?.permissions,
  (permissions) => {
    if (!permissions) {
      return;
    }

    if (!permissions.canCreateStoreOffers && permissions.canCreateServiceOffers) {
      form.domain = "service";
    }
  },
  { immediate: true }
);

async function loadCatalog() {
  catalog.loading = true;
  catalog.error = null;

  try {
    catalog.payload = await apiFetch<OfferResponse>("/offers");
  } catch (error) {
    catalog.error = error instanceof Error ? error.message : "No se pudo cargar el catalogo";
  } finally {
    catalog.loading = false;
  }
}

async function createOffer() {
  catalog.error = null;

  try {
    await apiFetch("/offers", {
      method: "POST",
      body: JSON.stringify(form)
    });
    form.title = "";
    form.description = "";
    form.isExclusive = false;
    await Promise.all([loadCatalog(), refreshProfile()]);
  } catch (error) {
    catalog.error = error instanceof Error ? error.message : "No se pudo crear la oferta";
  }
}

onMounted(loadCatalog);
</script>

<template>
  <AppShell>
    <section class="stack">
      <article class="panel highlight" v-if="catalog.payload && !catalog.payload.access.canAccessExclusiveOffers">
        <p class="eyebrow">Ofertas especiales</p>
        <h2>Acceso limitado</h2>
        <p>{{ catalog.payload.access.reason }}</p>
      </article>

      <article class="panel" v-if="state.profile && (state.profile.permissions.canCreateStoreOffers || state.profile.permissions.canCreateServiceOffers)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Gestion</p>
            <h2>Nueva oferta</h2>
          </div>
          <span class="badge neutral">Personal autorizado</span>
        </div>

        <form class="form-grid" @submit.prevent="createOffer">
          <input v-model="form.title" class="input" type="text" placeholder="Titulo" />
          <input v-model="form.description" class="input" type="text" placeholder="Descripcion breve" />
          <select v-model="form.domain" class="input">
            <option
              value="store"
              :disabled="!state.profile.permissions.canCreateStoreOffers"
            >
              Tienda
            </option>
            <option
              value="service"
              :disabled="!state.profile.permissions.canCreateServiceOffers"
            >
              Servicio
            </option>
          </select>
          <label class="checkbox">
            <input v-model="form.isExclusive" type="checkbox" />
            Marcar como exclusiva
          </label>
          <button class="button primary" type="submit">Guardar oferta</button>
        </form>
      </article>

      <p v-if="catalog.loading" class="state-text">Cargando ofertas...</p>
      <p v-else-if="catalog.error" class="state-text error">{{ catalog.error }}</p>

      <section v-else class="offer-grid">
        <OfferCard
          v-for="offer in catalog.payload?.items ?? []"
          :key="offer.id"
          :offer="offer"
          :locked="offer.is_exclusive && !(catalog.payload?.access.canAccessExclusiveOffers ?? false)"
        />
      </section>
    </section>
  </AppShell>
</template>
