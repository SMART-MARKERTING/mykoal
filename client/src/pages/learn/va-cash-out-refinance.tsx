import ArticleLayout, { type TocItem } from "@/components/learn/article-layout";
import {
  ArticleSection,
  P,
  SourceLink,
  StatCallout,
} from "@/components/learn/article-content";
import type { FAQ } from "@/lib/schema";

const SLUG = "va-cash-out-refinance";

const toc: TocItem[] = [
  { id: "what-is", label: "What is a VA cash-out refinance?" },
  { id: "vs-conventional", label: "How it differs from a conventional cash-out" },
  { id: "vs-irrrl", label: "How it differs from the VA IRRRL" },
  { id: "eligibility", label: "Equity and eligibility basics" },
  { id: "funding-fee", label: "Funding fee explained" },
  { id: "vs-heloc", label: "When it makes sense vs. a HELOC" },
];

const faqs: FAQ[] = [
  {
    question: "What is a VA cash-out refinance?",
    answer:
      "A VA cash-out refinance replaces your current mortgage with a new VA-backed loan and lets eligible borrowers take equity out as cash. It can also be used to refinance a non-VA loan — such as a conventional or FHA mortgage — into a VA loan, even when you are not taking much or any cash out.",
  },
  {
    question: "Can I refinance a conventional or FHA loan into a VA loan?",
    answer:
      "Yes. One distinctive feature of the VA cash-out refinance is that eligible borrowers can use it to move from a non-VA loan into a VA-backed loan. This is different from the VA IRRRL (streamline), which requires that you already have a VA loan.",
  },
  {
    question: "How is a VA cash-out different from the VA IRRRL?",
    answer:
      "The IRRRL (Interest Rate Reduction Refinance Loan) is a streamline refinance that requires an existing VA loan and does not allow cash out. The VA cash-out refinance can be used on a non-VA loan and does allow you to take equity as cash, but it generally involves a fuller underwrite, including an appraisal.",
  },
  {
    question: "How much equity do I need for a VA cash-out refinance?",
    answer:
      "The amount you can borrow is based on your home's appraised value, VA guidelines, and the lender's program limits. Specific limits vary and are determined during underwriting, so the most reliable way to learn your number is to have it calculated for your property through a full application review.",
  },
  {
    question: "Is there a VA funding fee on a cash-out refinance?",
    answer:
      "A VA funding fee generally applies, though some borrowers — such as many veterans receiving compensation for a service-connected disability — may be exempt. The exact fee depends on your circumstances and is published by the VA, so check the official VA fee table rather than relying on a quoted figure.",
  },
  {
    question: "Should I use a VA cash-out refinance or a HELOC?",
    answer:
      "It depends on your current rate and goals. A VA cash-out replaces your whole mortgage with one new VA loan and one payment, while a HELOC leaves your first mortgage in place and adds a flexible second loan. If keeping a low existing rate matters most, a HELOC may fit better; if you want a single VA-backed loan, the cash-out may win.",
  },
  {
    question: "Can I use a VA cash-out refinance on an investment property?",
    answer:
      "VA loans are intended for primary residences, so occupancy requirements apply. A VA cash-out refinance is generally for a home you live in, not a pure investment property. Your lender can confirm how the occupancy rules apply to your situation.",
  },
];

export default function VaCashOutRefinance() {
  return (
    <ArticleLayout
      slug={SLUG}
      category={{ id: "va", name: "VA Loans" }}
      title="VA Cash-Out Refinance: How It Works and Who Qualifies"
      description="How a VA cash-out refinance lets eligible veterans tap home equity — including converting a non-VA loan into a VA loan — and how it differs from a conventional cash-out and the VA IRRRL."
      datePublished="2026-06-12"
      dateModified="2026-06-12"
      displayDate="June 12, 2026"
      vaDisclaimer
      shortAnswer={
        <>
          A VA cash-out refinance replaces your current mortgage with a new VA-backed loan
          and lets eligible veterans take equity out as cash — and it can even convert a
          non-VA loan into a VA loan. Who qualifies comes down to VA eligibility, your home's
          equity, and a full underwriting review.
        </>
      }
      toc={toc}
      faqs={faqs}
      related={["heloc-vs-cash-out-refinance", "when-does-refinancing-make-sense"]}
      cta={{
        heading: "Explore your VA cash-out options",
        body: "See VA cash-out refinance options for your home — subject to VA eligibility and a full application review.",
        funnel: "va",
        label: "Explore VA loan options",
      }}
    >
      <ArticleSection id="what-is" heading="What is a VA cash-out refinance?">
        <P>
          A VA cash-out refinance replaces your existing mortgage with a new VA-backed loan
          and, for eligible borrowers, lets you take some of your home equity out as cash. You
          end up with one VA loan and one payment.
        </P>
        <P>
          It has a feature that surprises a lot of veterans: you do not need to already have a
          VA loan to use it. Eligible borrowers can refinance a conventional or FHA mortgage
          into a VA loan with this product — even if they are taking little or no cash out.
        </P>
        <StatCallout>
          The U.S. Department of Veterans Affairs notes that a VA-backed cash-out refinance
          lets eligible borrowers "take cash out of your home equity" and can be used to
          replace a non-VA loan with a VA-backed loan.{" "}
          <SourceLink
            href="https://www.va.gov/housing-assistance/home-loans/loan-types/cash-out-loan/"
            source="vagov"
          >
            Source: VA.gov
          </SourceLink>
        </StatCallout>
      </ArticleSection>

      <ArticleSection
        id="vs-conventional"
        heading="How it differs from a conventional cash-out"
      >
        <P>
          A conventional cash-out refinance and a VA cash-out refinance do the same basic job —
          replace your mortgage with a larger one and return the difference in cash — but they
          run on different rulebooks. The VA version is backed by the Department of Veterans
          Affairs and limited to eligible borrowers, and it carries a VA funding fee instead of
          conventional mortgage insurance.
        </P>
        <P>
          For a borrower who qualifies, the VA structure can be attractive precisely because it
          is VA-backed. The right comparison for your situation depends on eligibility, equity,
          and your goals, which is why running both side by side is worth the time.
        </P>
      </ArticleSection>

      <ArticleSection id="vs-irrrl" heading="How it differs from the VA IRRRL (streamline)">
        <P>
          The VA IRRRL — Interest Rate Reduction Refinance Loan — is the VA's streamline
          refinance. Two differences matter most:
        </P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>
            <strong className="text-white">Starting loan:</strong> the IRRRL requires you to
            already have a VA loan; the cash-out can refinance a non-VA loan into a VA loan.
          </li>
          <li>
            <strong className="text-white">Cash out:</strong> the IRRRL does not let you take
            equity as cash; the cash-out does.
          </li>
          <li>
            <strong className="text-white">Process:</strong> the IRRRL is a lighter-touch
            streamline, while the cash-out generally involves a fuller underwrite, including an
            appraisal.
          </li>
        </ul>
        <P>
          In short: choose the IRRRL to lower the rate on an existing VA loan with minimal
          paperwork, and the cash-out when you want equity or need to convert a non-VA loan.
        </P>
      </ArticleSection>

      <ArticleSection id="eligibility" heading="Equity and eligibility basics">
        <P>
          Two things drive a VA cash-out: your VA eligibility and your home's equity.
          Eligibility is based on military service and confirmed by a Certificate of
          Eligibility (COE), and occupancy rules apply because VA loans are for primary
          residences. How much you can borrow depends on your home's appraised value, VA
          guidelines, and the lender's program limits.
        </P>
        <P>
          Rather than relying on a rule of thumb, the dependable path is to have your equity
          and eligibility reviewed for your specific property — every approval is subject to a
          full application review.
        </P>
      </ArticleSection>

      <ArticleSection id="funding-fee" heading="Funding fee explained">
        <P>
          Most VA loans, including the cash-out refinance, carry a one-time VA funding fee that
          helps keep the program running. The fee can often be financed into the loan. Some
          borrowers are exempt — for example, many veterans who receive compensation for a
          service-connected disability.
        </P>
        <P>
          The exact funding fee depends on your circumstances, and the VA publishes the current
          amounts directly. Always confirm against the official table rather than a quoted
          number:
        </P>
        <p className="text-blue-300/70 text-sm">
          <SourceLink
            href="https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/"
            source="vagov"
          >
            VA.gov: funding fee and closing costs
          </SourceLink>
        </p>
      </ArticleSection>

      <ArticleSection id="vs-heloc" heading="When it makes sense vs. a HELOC">
        <P>
          If your goal is to tap equity, a VA cash-out refinance is not your only option — a
          HELOC can do it too, in the opposite way. A VA cash-out replaces your whole mortgage
          with one new VA-backed loan; a HELOC leaves your first mortgage in place and adds a
          flexible second loan on top.
        </P>
        <P>
          If keeping a low existing rate is your priority, a HELOC may be the better fit. If you
          want a single VA-backed loan with one predictable payment — or you need to convert a
          non-VA loan — the cash-out may win. It is worth weighing both before deciding.
        </P>
      </ArticleSection>
    </ArticleLayout>
  );
}
