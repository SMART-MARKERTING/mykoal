import { Calendar, ShieldCheck } from "lucide-react";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";
import {
  LO_NAME,
  LO_TITLE,
  NMLS_ID,
  COMPANY_NAME,
  COMPANY_NMLS_ID,
  LICENSED_STATES_ABBR,
} from "@/lib/site-config";

interface AuthorBoxProps {
  /** Human-readable last-updated date shown on the article. */
  dateModified: string;
  /** Compliance review date placeholder/value. */
  reviewDate: string;
}

/**
 * Author / reviewer block for every article: LO name, NMLS ID, company,
 * service states, and the last-updated + compliance-review dates.
 */
export default function AuthorBox({ dateModified, reviewDate }: AuthorBoxProps) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={headshotImage}
          alt={LO_NAME}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
        />
        <div>
          <p className="text-white text-sm font-semibold">
            {LO_NAME}, NMLS #{NMLS_ID}
          </p>
          <p className="text-blue-300/70 text-xs">{LO_TITLE}</p>
          <p className="text-blue-300/70 text-xs">
            {COMPANY_NAME} · NMLS #{COMPANY_NMLS_ID}
          </p>
        </div>
      </div>
      <p className="text-blue-200/70 text-xs mb-3">
        Serving {LICENSED_STATES_ABBR}.
      </p>
      <div className="space-y-1 border-t border-white/10 pt-3">
        <p className="text-blue-300/60 text-xs flex items-center gap-1.5">
          <Calendar className="h-3 w-3 flex-shrink-0" /> Last updated: {dateModified}
        </p>
        <p className="text-blue-300/60 text-xs flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 flex-shrink-0" /> Reviewed for mortgage
          compliance: {reviewDate}
        </p>
      </div>
    </div>
  );
}
