import { reactive } from "vue";
import type { Session } from "@supabase/supabase-js";
import { apiFetch } from "../api/http";
import { supabase } from "../api/supabase";
import type { MeResponse } from "../types/app";

const state = reactive<{
  session: Session | null;
  profile: MeResponse | null;
  loading: boolean;
  error: string | null;
}>({
  session: null,
  profile: null,
  loading: true,
  error: null
});

async function refreshProfile() {
  if (!state.session) {
    state.profile = null;
    return;
  }

  state.profile = await apiFetch<MeResponse>("/me");
}

export async function initializeAuth() {
  state.loading = true;
  const {
    data: { session }
  } = await supabase.auth.getSession();

  state.session = session;
  state.error = null;

  try {
    await refreshProfile();
  } catch (error) {
    state.error = error instanceof Error ? error.message : "No se pudo cargar el perfil";
  } finally {
    state.loading = false;
  }

  supabase.auth.onAuthStateChange(async (_event, session) => {
    state.session = session;
    if (!session) {
      state.profile = null;
      return;
    }

    try {
      await refreshProfile();
      state.error = null;
    } catch (error) {
      state.error = error instanceof Error ? error.message : "No se pudo cargar el perfil";
    }
  });
}

export function useAuth() {
  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return {
    state,
    refreshProfile,
    signInWithGitHub,
    signOut
  };
}
