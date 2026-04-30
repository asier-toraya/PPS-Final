import { Capacitor } from "@capacitor/core";

const defaultMobileRedirectUrl = "veterinariaasier://auth/callback";

export function isNativePlatform() {
  return Capacitor.isNativePlatform();
}

export function getWebRedirectUrl() {
  return import.meta.env.VITE_AUTH_REDIRECT_URL || import.meta.env.VITE_WEB_REDIRECT_URL || `${window.location.origin}/`;
}

export function getMobileRedirectUrl() {
  return import.meta.env.VITE_MOBILE_REDIRECT_URL || defaultMobileRedirectUrl;
}

export function getOAuthRedirectUrl() {
  return isNativePlatform() ? getMobileRedirectUrl() : getWebRedirectUrl();
}

export function getNativeCallbackPrefix() {
  const redirectUrl = getMobileRedirectUrl();
  const parsed = new URL(redirectUrl);

  return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
}
