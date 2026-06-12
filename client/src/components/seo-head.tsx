import { useEffect } from "react";
import { canonicalUrl, SITE_URL, LO_HEADSHOT_URL } from "@/lib/site-config";

/**
 * SeoHead imperatively manages document <head> for a page: title, meta
 * description, canonical link, Open Graph + Twitter/X tags, and one or more
 * JSON-LD schema blocks. It cleans up everything it created on unmount so SPA
 * navigation (wouter) never leaves stale tags behind.
 *
 * No external head-management dependency is used to keep the bundle lean and
 * match the repo's zero-dependency-for-meta convention (index.html holds the
 * sitewide defaults).
 */

interface SeoHeadProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/learn/va-loan-myths". Drives canonical + OG url. */
  path: string;
  /** Absolute image URL for OG/Twitter cards. Defaults to the site headshot. */
  image?: string;
  ogType?: string;
  /** JSON-LD objects to inject as <script type="application/ld+json"> blocks. */
  schemas?: Record<string, unknown>[];
}

const MANAGED_ATTR = "data-seo-head";

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return { el, created };
}

export default function SeoHead({
  title,
  description,
  path,
  image = LO_HEADSHOT_URL,
  ogType = "article",
  schemas = [],
}: SeoHeadProps) {
  useEffect(() => {
    const url = canonicalUrl(path);
    const previousTitle = document.title;
    document.title = title;

    const created: Element[] = [];

    // Description
    const descEl = document.head.querySelector('meta[name="description"]');
    const previousDesc = descEl?.getAttribute("content") ?? null;
    upsertMeta('meta[name="description"]', "name", "description", description);

    // Canonical
    const { el: canonicalEl, created: canonicalCreated } = upsertCanonical(url);
    const previousCanonical = canonicalCreated ? null : canonicalEl.getAttribute("href");

    // Open Graph + Twitter/X — these are page-specific, so we manage (and remove) them.
    const tags: Array<[string, "name" | "property", string, string]> = [
      ['meta[property="og:type"]', "property", "og:type", ogType],
      ['meta[property="og:title"]', "property", "og:title", title],
      ['meta[property="og:description"]', "property", "og:description", description],
      ['meta[property="og:url"]', "property", "og:url", url],
      ['meta[property="og:image"]', "property", "og:image", image],
      ['meta[property="og:site_name"]', "property", "og:site_name", "MyKoal"],
      ['meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image"],
      ['meta[name="twitter:title"]', "name", "twitter:title", title],
      ['meta[name="twitter:description"]', "name", "twitter:description", description],
      ['meta[name="twitter:image"]', "name", "twitter:image", image],
    ];
    for (const [selector, attr, key, content] of tags) {
      const existed = document.head.querySelector(selector);
      const el = upsertMeta(selector, attr, key, content);
      if (!existed) created.push(el);
    }

    // JSON-LD schema blocks
    for (const schema of schemas) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(MANAGED_ATTR, "true");
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      created.push(script);
    }

    return () => {
      document.title = previousTitle;
      if (previousDesc !== null) {
        document.head
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", previousDesc);
      }
      if (previousCanonical !== null) {
        canonicalEl.setAttribute("href", previousCanonical);
      } else if (canonicalCreated) {
        canonicalEl.remove();
      }
      for (const el of created) el.remove();
    };
    // Re-run when the page identity or its schema changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, ogType, JSON.stringify(schemas)]);

  return null;
}

export { SITE_URL };
