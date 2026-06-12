import ecoaLogo from "@assets/image_1772497699846.png";
import {
  LO_NAME,
  LO_TITLE,
  NMLS_ID,
  COMPANY_NAME,
  COMPANY_NMLS_ID,
  LICENSED_STATES_ABBR,
  EQUAL_HOUSING_TEXT,
  COMPLIANCE_REVIEW_DATE,
} from "@/lib/site-config";

/**
 * Compliance footer for every mortgage-related /learn page. Carries the Equal
 * Housing logo + text, licensing identity, and the compliance-review date.
 * Educational content only — no rates, APRs, fees, or approval guarantees.
 */
export default function ComplianceFooter() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-10">
      <div className="flex justify-center mb-4">
        <img src={ecoaLogo} alt="Equal Housing Opportunity" className="h-10 w-auto" />
      </div>
      <div className="text-center space-y-1 mb-3">
        <p className="text-white text-sm font-semibold">{LO_NAME}</p>
        <p className="text-blue-200 text-xs">
          {LO_TITLE} · NMLS #{NMLS_ID}
        </p>
        <p className="text-blue-200 text-xs">
          {COMPANY_NAME} · NMLS #{COMPANY_NMLS_ID}
        </p>
        <p className="text-blue-300/60 text-xs">
          Equal Housing Opportunity · Licensed in {LICENSED_STATES_ABBR}
        </p>
      </div>
      <p className="text-blue-200/60 text-xs text-center leading-relaxed mb-3">
        {EQUAL_HOUSING_TEXT}
      </p>
      <p className="text-blue-300/50 text-xs text-center leading-relaxed">
        This article is for general educational purposes only and is not financial,
        legal, or tax advice. It is not a commitment to lend, and it does not
        guarantee any loan terms or approval. All loans are subject to a full
        application review, credit approval, and underwriting. Reviewed for mortgage
        compliance: {COMPLIANCE_REVIEW_DATE}.
      </p>
    </div>
  );
}
