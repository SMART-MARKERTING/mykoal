/**
 * Lightweight, dependency-free event tracking for the /learn section.
 *
 * Events are pushed to window.dataLayer (the Google Tag Manager / GA4 convention)
 * so a tag manager can pick them up without any code change. When no dataLayer is
 * present the call is a safe no-op (logged in dev only).
 *
 * Event name convention: `{article_slug}_{element}_{action}` in snake_case.
 * All events are documented in /TRACKING.md at the repo root.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** snake_case a slug or label so event names stay consistent. */
function snake(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Push a raw event name plus optional params to the dataLayer. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params);
  }
}

/**
 * Track an article interaction using the documented naming convention:
 *   `{article_slug}_{element}_{action}`
 * e.g. articleEvent("va-loan-myths", "cta", "click")
 *      -> "va_loan_myths_cta_click"
 */
export function articleEvent(
  slug: string,
  element: string,
  action: string,
  params: Record<string, unknown> = {},
): void {
  const event = `${snake(slug)}_${snake(element)}_${snake(action)}`;
  track(event, { article_slug: slug, element, action, ...params });
}
