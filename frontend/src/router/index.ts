import { createRouter, createWebHistory } from "vue-router";
import { initializeAuth, useAuth } from "../composables/useAuth";
import AdminView from "../views/AdminView.vue";
import CatalogView from "../views/CatalogView.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: "/catalogo",
    name: "catalog",
    component: CatalogView,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true, adminOnly: true }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

let initialized = false;

router.beforeEach(async (to) => {
  if (!initialized) {
    await initializeAuth();
    initialized = true;
  }

  const { state } = useAuth();

  if (to.meta.requiresAuth && !state.session) {
    return { name: "login" };
  }

  if (to.name === "login" && state.session) {
    return { name: "dashboard" };
  }

  if (to.meta.adminOnly && state.profile?.profile.role !== "admin") {
    return { name: "dashboard" };
  }

  return true;
});

