import { reactive } from "vue";
import { App as CapacitorApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import type { Session } from "@supabase/supabase-js";
import { apiFetch } from "../api/http";
import { supabase } from "../api/supabase";
import { getNativeCallbackPrefix, getOAuthRedirectUrl, isNativePlatform } from "../config/platform";
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

let authSubscriptionRegistered = false;
let nativeCallbackRegistered = false;

async function refreshProfile() {
  if (!state.session) {
    state.profile = null;
    return;
  }

  state.profile = await apiFetch<MeResponse>("/me");
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "No se pudo completar la autenticación";
}

async function completeNativeSignIn(url: string) {
  const parsedUrl = new URL(url);
  const authError = parsedUrl.searchParams.get("error_description") ?? parsedUrl.searchParams.get("error");

  if (authError) {
    throw new Error(authError);
  }

  const code = parsedUrl.searchParams.get("code");

  if (!code) {
    throw new Error("No se recibió el código OAuth de Supabase");
  }

  await supabase.auth.exchangeCodeForSession(code);
  await Browser.close().catch(() => undefined);
}

async function registerNativeCallback() {
  if (!isNativePlatform() || nativeCallbackRegistered) {
    return;
  }

  await CapacitorApp.addListener("appUrlOpen", async ({ url }) => {
    if (!url.startsWith(getNativeCallbackPrefix())) {
      return;
    }

    state.loading = true;
    state.error = null;

    try {
      await completeNativeSignIn(url);
    } catch (error) {
      state.error = getErrorMessage(error);
    } finally {
      state.loading = false;
    }
  });

  nativeCallbackRegistered = true;
}

export async function initializeAuth() {
  state.loading = true;
  await registerNativeCallback();

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

  if (!authSubscriptionRegistered) {
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

    authSubscriptionRegistered = true;
  }
}

export function useAuth() {
  async function signInWithGitHub() {
    state.error = null;

    try {
      if (isNativePlatform()) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: getOAuthRedirectUrl(),
            skipBrowserRedirect: true
          }
        });

        if (error) {
          throw error;
        }

        if (!data?.url) {
          throw new Error("Supabase no devolvió la URL de autenticación");
        }

        await Browser.open({ url: data.url });
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: getOAuthRedirectUrl()
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      state.error = getErrorMessage(error);
    }
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
