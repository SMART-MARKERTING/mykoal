import { Flag } from "lucide-react";
import { VA_DISCLAIMER_TEXT } from "@/lib/site-config";

/**
 * VA non-affiliation disclaimer for VA-related pages.
 *
 * Renders the {{VA_DISCLAIMER_TEXT}} placeholder from site-config, which
 * compliance fills with approved copy before publishing. The site, the LO, and
 * the products must never imply VA or government endorsement.
 */
export default function VaDisclaimer() {
  return (
    <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 flex gap-3">
      <Flag className="h-4 w-4 text-amber-300 flex-shrink-0 mt-0.5" />
      <p className="text-amber-100/90 text-xs leading-relaxed">{VA_DISCLAIMER_TEXT}</p>
    </div>
  );
}
