import { createContext, useContext, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { articleEvent } from "@/lib/analytics";

/** Provides the current article slug to body helpers for event naming. */
export const ArticleSlugContext = createContext<string>("");

export function useArticleSlug(): string {
  return useContext(ArticleSlugContext);
}

interface ArticleSectionProps {
  /** Anchor id — must match the matching TOC item id. */
  id: string;
  heading: string;
  children: ReactNode;
}

/** A body section with an anchor id (for the table of contents) and an h2. */
export function ArticleSection({ id, heading, children }: ArticleSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 mb-8">
      <h2 className="text-white text-xl font-bold mb-3">{heading}</h2>
      <div className="space-y-3 text-blue-100/80 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

/** Standard educational paragraph. */
export function P({ children }: { children: ReactNode }) {
  return <p className="text-blue-100/80 text-sm leading-relaxed">{children}</p>;
}

interface SourceLinkProps {
  href: string;
  children: ReactNode;
  /** Short label used in the tracking event, e.g. "vagov" or "cfpb". */
  source: string;
}

/**
 * Outbound link to an authoritative source (CFPB, VA.gov, HUD, Fannie/Freddie).
 * Tracks an `{article_slug}_source_{source}_click` event.
 */
export function SourceLink({ href, children, source }: SourceLinkProps) {
  const slug = useArticleSlug();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={() => articleEvent(slug, "source", "click", { source, href })}
      className="text-[#00b4d8] hover:text-white underline inline-flex items-center gap-0.5 transition-colors"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

/** Pull-quote / cited statistic callout — high-lift citation signal. */
export function StatCallout({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-[#00b4d8] bg-white/5 rounded-r-lg pl-4 pr-3 py-3 my-4">
      <p className="text-blue-100/90 text-sm leading-relaxed italic">{children}</p>
    </blockquote>
  );
}

export interface ComparisonColumn {
  key: string;
  label: string;
}

export interface ComparisonRow {
  label: string;
  values: Record<string, string>;
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** Row-header column heading (top-left cell). */
  rowHeader?: string;
}

/** Responsive comparison table for side-by-side product comparisons. */
export function ComparisonTable({ columns, rows, rowHeader = "" }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-1 my-4">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-3 pr-3 text-blue-300/70 font-semibold align-bottom">
              {rowHeader}
            </th>
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-3 text-white font-semibold align-bottom">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/10 align-top">
              <td className="py-3 pr-3 text-blue-200/90 font-medium">{row.label}</td>
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-3 text-blue-100/80">
                  {row.values[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
