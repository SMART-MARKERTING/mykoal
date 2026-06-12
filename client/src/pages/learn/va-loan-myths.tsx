import type { ReactNode } from "react";
import ArticleLayout, { type TocItem } from "@/components/learn/article-layout";
import {
  ArticleSection,
  P,
  SourceLink,
  StatCallout,
} from "@/components/learn/article-content";
import type { FAQ } from "@/lib/schema";

const SLUG = "va-loan-myths";

const toc: TocItem[] = [
  { id: "myth-once", label: "Myth: you can only use a VA loan once" },
  { id: "myth-down", label: "Myth: VA loans require a down payment" },
  { id: "myth-slow", label: "Myth: VA loans take much longer to close" },
  { id: "myth-sellers", label: "Myth: sellers avoid VA offers" },
  { id: "myth-first-home", label: "Myth: VA loans are only for first homes" },
  { id: "eligibility", label: "What VA eligibility actually requires" },
];

/** Renders the myth / reality / source structure used in each section. */
function MythReality({
  reality,
  source,
}: {
  reality: ReactNode;
  source: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <span className="inline-block bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
          The reality
        </span>
      </div>
      <P>{reality}</P>
      <p className="text-blue-300/60 text-xs">{source}</p>
    </div>
  );
}

const faqs: FAQ[] = [
  {
    question: "Can you use a VA loan more than once?",
    answer:
      "Yes. The VA home loan benefit can be reused as long as you have remaining entitlement, and entitlement can often be restored — for example after you sell a home and pay off the prior VA loan. Many veterans use the benefit multiple times over their lives.",
  },
  {
    question: "Do VA loans really require zero down payment?",
    answer:
      "For eligible borrowers with full entitlement, VA-backed purchase loans generally allow financing with no down payment, which is one of the program's signature features. Eligibility and final terms are determined by VA guidelines and lender underwriting through a full application review.",
  },
  {
    question: "Do VA loans take longer to close than other loans?",
    answer:
      "Not inherently. Modern VA loans follow timelines comparable to other mortgage types. Delays usually come from the specifics of a file rather than from the VA program itself, and an experienced lender can keep a VA purchase moving on a normal schedule.",
  },
  {
    question: "Will sellers reject my offer because it's a VA loan?",
    answer:
      "A well-prepared VA offer is competitive. The idea that sellers avoid VA buyers is largely outdated; what matters most is a strong, clearly communicated offer and a lender who works well with the listing side. Financing type alone should not sink a solid offer.",
  },
  {
    question: "Is the VA loan only for first-time buyers or first homes?",
    answer:
      "No. The VA loan is not limited to first-time buyers, and it can be used again on future homes as long as you meet occupancy and entitlement rules. It is a reusable benefit, not a one-time, first-home-only program.",
  },
  {
    question: "Who is eligible for a VA loan?",
    answer:
      "Eligibility is based on military service and is confirmed by a Certificate of Eligibility (COE). It generally extends to qualifying veterans, active-duty service members, certain National Guard and Reserve members, and some surviving spouses. Your lender can help you request your COE, and approval is subject to VA guidelines and a full application review.",
  },
];

export default function VaLoanMyths() {
  return (
    <ArticleLayout
      slug={SLUG}
      category={{ id: "va", name: "VA Loans" }}
      title="VA Loan Myths That Cost Veterans Money"
      description="The most common VA loan myths — used your benefit, need a down payment, slow to close, sellers won't accept — are outdated or wrong, and they cost eligible veterans money."
      datePublished="2026-06-12"
      dateModified="2026-06-12"
      displayDate="June 12, 2026"
      vaDisclaimer
      shortAnswer={
        <>
          Most of the common beliefs about VA loans — that you can only use the benefit
          once, that you need a down payment, that they are slow, or that sellers reject
          them — are outdated or simply wrong. Believing them costs eligible veterans real
          money by steering them away from a benefit they have already earned.
        </>
      }
      toc={toc}
      faqs={faqs}
      related={["va-cash-out-refinance", "heloc-vs-cash-out-refinance"]}
      cta={{
        heading: "Put your VA benefit to work",
        body: "See VA-backed loan options matched to your situation — subject to VA eligibility and a full application review.",
        funnel: "va",
        label: "Explore VA loan options",
      }}
    >
      <ArticleSection id="intro" heading="Why these myths matter">
        <P>
          The VA home loan is one of the strongest financing benefits available — and
          misinformation keeps eligible borrowers from using it. Below are five myths that
          cost veterans money, each paired with the reality and a place to verify it for
          yourself.
        </P>
        <StatCallout>
          The U.S. Department of Veterans Affairs describes the VA-backed home loan as a
          benefit earned through service that can help eligible Veterans, service members,
          and survivors buy, build, or improve a home — and, in many cases, reuse the
          benefit over time.{" "}
          <SourceLink href="https://www.va.gov/housing-assistance/home-loans/" source="vagov">
            Source: VA.gov
          </SourceLink>
        </StatCallout>
      </ArticleSection>

      <ArticleSection id="myth-once" heading="Myth: you can only use a VA loan once">
        <p className="text-blue-300/70 text-sm italic">
          The myth: "I already used my VA benefit, so it's gone."
        </p>
        <MythReality
          reality={
            <>
              The benefit is reusable. As long as you have remaining entitlement — or you
              restore it, often by selling a home and paying off the prior VA loan — you can
              use a VA loan again. Plenty of veterans finance more than one home this way over
              the years.
            </>
          }
          source={
            <SourceLink
              href="https://www.va.gov/housing-assistance/home-loans/loan-types/"
              source="vagov"
            >
              Verify on VA.gov: home loan eligibility and entitlement
            </SourceLink>
          }
        />
      </ArticleSection>

      <ArticleSection id="myth-down" heading="Myth: VA loans require a down payment">
        <p className="text-blue-300/70 text-sm italic">
          The myth: "I need to save 20% before I can use my VA loan."
        </p>
        <MythReality
          reality={
            <>
              For eligible borrowers with full entitlement, VA-backed purchase loans generally
              allow no down payment at all. That is one of the program's defining advantages
              and a major reason it exists. Final terms depend on VA guidelines and lender
              underwriting.
            </>
          }
          source={
            <SourceLink
              href="https://www.va.gov/housing-assistance/home-loans/"
              source="vagov"
            >
              Verify on VA.gov: VA-backed home loans
            </SourceLink>
          }
        />
      </ArticleSection>

      <ArticleSection id="myth-slow" heading="Myth: VA loans take much longer to close">
        <p className="text-blue-300/70 text-sm italic">
          The myth: "A VA loan will drag the closing out for months."
        </p>
        <MythReality
          reality={
            <>
              VA loans close on timelines comparable to other mortgage types. The program
              itself does not add weeks; delays usually trace back to the details of a
              specific file. An experienced VA lender keeps the process on a normal schedule.
            </>
          }
          source={
            <SourceLink
              href="https://www.consumerfinance.gov/owning-a-home/"
              source="cfpb"
            >
              Verify on CFPB: the homebuying and closing process
            </SourceLink>
          }
        />
      </ArticleSection>

      <ArticleSection id="myth-sellers" heading="Myth: sellers avoid VA offers">
        <p className="text-blue-300/70 text-sm italic">
          The myth: "Sellers won't accept my offer because it's VA."
        </p>
        <MythReality
          reality={
            <>
              A strong, well-presented VA offer competes with any other. The notion that
              sellers shy away from VA buyers is largely outdated. What moves a seller is a
              clean offer and a lender who communicates well with the listing agent — not the
              financing label.
            </>
          }
          source={
            <SourceLink
              href="https://www.va.gov/housing-assistance/home-loans/"
              source="vagov"
            >
              Verify on VA.gov: how VA-backed loans work
            </SourceLink>
          }
        />
      </ArticleSection>

      <ArticleSection id="myth-first-home" heading="Myth: VA loans are only for first homes">
        <p className="text-blue-300/70 text-sm italic">
          The myth: "The VA loan is a one-time, first-home-only deal."
        </p>
        <MythReality
          reality={
            <>
              The VA loan is not limited to first-time buyers or first homes. Subject to
              occupancy and entitlement rules, you can use it again on a future home. It is a
              reusable benefit designed to serve you across more than one purchase.
            </>
          }
          source={
            <SourceLink
              href="https://www.va.gov/housing-assistance/home-loans/loan-types/"
              source="vagov"
            >
              Verify on VA.gov: VA loan types and reuse
            </SourceLink>
          }
        />
      </ArticleSection>

      <ArticleSection id="eligibility" heading="What VA eligibility actually requires">
        <P>
          VA loan eligibility is based on your military service and confirmed by a Certificate
          of Eligibility (COE). It generally extends to qualifying veterans, active-duty
          service members, certain Guard and Reserve members, and some surviving spouses. Your
          lender can usually help you request the COE as part of the process.
        </P>
        <P>
          Meeting the service-based eligibility is the starting point — final approval still
          depends on VA guidelines and the lender's underwriting through a full application
          review. The takeaway: do not talk yourself out of the benefit based on a myth. Verify
          your eligibility and let the facts decide.
        </P>
      </ArticleSection>
    </ArticleLayout>
  );
}
