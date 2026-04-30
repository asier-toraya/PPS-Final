import { isNativePlatform } from "./platform";

export type FrontendVariant = "web" | "mobile";

const mobileUserAgentPattern =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

function normalizeVariant(value: string | undefined): FrontendVariant {
  return value === "mobile" ? "mobile" : "web";
}

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return "";
  }

  try {
    return new URL(value).toString();
  } catch {
    return "";
  }
}

export function getFrontendVariant(): FrontendVariant {
  return normalizeVariant(import.meta.env.VITE_FRONTEND_VARIANT);
}

export function isMobileFrontendVariant() {
  return getFrontendVariant() === "mobile";
}

export function getWebSiteUrl() {
  return normalizeSiteUrl(import.meta.env.VITE_WEB_SITE_URL);
}

export function getMobileSiteUrl() {
  return normalizeSiteUrl(import.meta.env.VITE_MOBILE_SITE_URL);
}

export function isMobileBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return mobileUserAgentPattern.test(navigator.userAgent);
}

export function ensureFrontendVariantForDevice() {
  if (typeof window === "undefined" || isNativePlatform()) {
    return false;
  }

  const variant = getFrontendVariant();
  const mustUseMobileSite = variant === "web" && isMobileBrowser();
  const mustUseWebSite = variant === "mobile" && !isMobileBrowser();
  const targetBase = mustUseMobileSite ? getMobileSiteUrl() : mustUseWebSite ? getWebSiteUrl() : "";

  if (!targetBase) {
    return false;
  }

  const targetUrl = new URL(targetBase);

  if (targetUrl.origin === window.location.origin) {
    return false;
  }

  targetUrl.pathname = window.location.pathname;
  targetUrl.search = window.location.search;
  targetUrl.hash = window.location.hash;

  window.location.replace(targetUrl.toString());
  return true;
}
