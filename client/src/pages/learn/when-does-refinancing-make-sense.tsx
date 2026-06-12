import ArticleLayout, { type TocItem } from "@/components/learn/article-layout";
import {
  ArticleSection,
  P,
  SourceLink,
  StatCallout,
} from "@/components/learn/article-content";
import type { FAQ } from "@/lib/schema";

const SLUG = "when-does-refinancing-make-sense";

const toc: TocItem[] = [
  { id: "what-is-refi", label: "What does refinancing mean?" },
  { id: "break-even", label: "The break-even calculation" },
  { id: "rate-term", label: "Rate-and-term refinance" },
  { id: "cash-out", label: "Cash-out refinance" },
  { id: "not-worth-it", label: "When refinancing may not make sense" },
  { id: "questions", label: "Questions to ask before applying" },
];

const faqs: FAQ[] = [
  {
    question: "How do I know if refinancing is worth it?",
    answer:
      "Calculate your break-even point: divide your total closing costs by the amount you would save each month. The result is roughly how many months it takes for the savings to repay the costs. If you plan to keep the loan well past that point, refinancing is more likely to be worth it.",
  },
  {
    question: "What is the break-even point on a refinance?",
    answer:
      "The break-even point is the month when your accumulated monthly savings finally equal what you paid in closing costs. Before that point you are still recovering the cost of refinancing; after it, the savings are yours. It is the single most useful number for deciding whether to refinance.",
  },
  {
    question: "How much do you need to save to make refinancing worthwhile?",
    answer:
      "There is no universal rule — what matters is your break-even point relative to how long you will keep the loan. A smaller monthly saving can still be worth it if your closing costs are low and you stay in the home for years, while a large saving may not pay off if you sell or refinance again soon.",
  },
  {
    question: "Does refinancing reset my loan term?",
    answer:
      "It can. Refinancing into a new 30-year loan restarts the clock, which lowers the payment but can increase total interest over time. You can avoid that by refinancing into a shorter term, though that usually raises the monthly payment. Comparing total interest, not just the payment, helps you see the full picture.",
  },
  {
    question: "Will refinancing hurt my credit score?",
    answer:
      "Applying triggers a hard credit inquiry, which may lower your score by a few points temporarily. When you are rate shopping, multiple mortgage inquiries within a short window are generally treated as a single inquiry by the credit scoring models, so comparing lenders does not multiply the impact.",
  },
  {
    question: "How long does a refinance take to close?",
    answer:
      "Timelines vary with appraisal scheduling, title work, and lender volume, and cash-out or complex files can take longer. A clear timeline should be set with you up front so there are no surprises, and any estimate is subject to a full application review.",
  },
  {
    question: "Can I refinance if I have a HELOC or second mortgage?",
    answer:
      "Often yes, but it requires the second-lien holder to agree to stay behind the new first mortgage — a standard step called subordination. It adds time to the process but is common, and your loan officer can coordinate it.",
  },
];

export default function WhenDoesRefinancingMakeSense() {
  return (
    <ArticleLayout
      slug={SLUG}
      category={{ id: "rate-term", name: "Rate-and-Term Refinance" }}
      title="When Does Refinancing a Mortgage Make Sense?"
      description="Refinancing makes sense when you stay in the loan past its break-even point. Here's the break-even math in plain English, with a worked example and the questions to ask first."
      datePublished="2026-06-12"
      dateModified="2026-06-12"
      displayDate="June 12, 2026"
      shortAnswer={
        <>
          Refinancing usually makes sense when you will keep the new loan long enough to
          pass its break-even point — the month your monthly savings finally repay your
          closing costs. If you will move or refinance again before then, the costs likely
          outweigh the savings.
        </>
      }
      toc={toc}
      faqs={faqs}
      related={["heloc-vs-cash-out-refinance", "va-cash-out-refinance"]}
      cta={{
        heading: "Run your refinance numbers",
        body: "See whether a refinance pencils out for your loan — subject to a full application review.",
        funnel: "refinance",
        label: "Explore refinance options",
      }}
    >
      <ArticleSection id="what-is-refi" heading="What does refinancing mean?">
        <P>
          Refinancing means replacing your current mortgage with a new one. People refinance
          to lower their interest rate, change their loan term, switch from an adjustable to a
          fixed rate, drop mortgage insurance, or pull cash out of their equity. Whatever the
          goal, you are paying off the old loan with a new one — and paying closing costs to
          do it.
        </P>
        <P>
          Because there is a cost to refinance, the real question is never just "is my new
          rate lower?" It is "will I keep this loan long enough for the savings to outrun the
          cost?" That is what the break-even calculation answers.
        </P>
      </ArticleSection>

      <ArticleSection id="break-even" heading="The break-even calculation">
        <P>The math is simple:</P>
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center my-2">
          <p className="text-white text-sm font-semibold">
            Break-even (months) = total closing costs ÷ monthly savings
          </p>
        </div>
        <StatCallout>
          As the Consumer Financial Protection Bureau puts it, one way to decide whether
          refinancing makes sense is to "calculate the break-even point" — how long it takes
          for the savings to outweigh the cost of refinancing.{" "}
          <SourceLink href="https://www.consumerfinance.gov/" source="cfpb">
            Source: CFPB
          </SourceLink>
        </StatCallout>
        <P>
          <strong className="text-white">Worked example (placeholder figures only):</strong>{" "}
          Say refinancing costs you <em>$C</em> in total closing costs and lowers your payment
          by <em>$S</em> per month. Your break-even is <em>$C ÷ $S</em> months.
        </P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>
            If closing costs are <em>$C</em> = $6,000 and you save <em>$S</em> = $200/month,
            break-even = 6,000 ÷ 200 = <strong className="text-white">30 months</strong>.
          </li>
          <li>
            Plan to stay <strong className="text-white">longer than 30 months</strong>? The
            refinance likely pays off.
          </li>
          <li>
            Plan to sell or refinance again <strong className="text-white">sooner</strong>?
            You may not recover the cost.
          </li>
        </ul>
        <P>
          These dollar amounts are illustrative placeholders to show the method — they are not
          quotes or current pricing. Your real closing costs and savings come from a full
          application review of your specific loan.
        </P>
      </ArticleSection>

      <ArticleSection id="rate-term" heading="Rate-and-term refinance">
        <P>
          A rate-and-term refinance changes your rate, your term, or both — without taking cash
          out. It is the classic "lower my rate" or "shorten my loan" refinance. Lowering the
          rate reduces the payment; shortening the term (say, from 30 years to 15) can save a
          lot of total interest but usually raises the monthly payment.
        </P>
        <P>
          Because no cash leaves the deal, rate-and-term refinances tend to have the cleanest
          break-even math: compare the cost to refinance against the monthly savings and see
          how long until you come out ahead.
        </P>
      </ArticleSection>

      <ArticleSection id="cash-out" heading="Cash-out refinance">
        <P>
          A cash-out refinance replaces your mortgage with a larger one and returns the
          difference to you in cash. The decision is a little different here: you are not only
          weighing rate savings, you are also valuing access to your equity for a purpose like
          home improvements or consolidating higher-interest debt.
        </P>
        <P>
          If you mainly want to tap equity while keeping a low existing rate, it is worth
          comparing a cash-out refinance against a HELOC before deciding — they solve the same
          problem in opposite ways.
        </P>
      </ArticleSection>

      <ArticleSection id="not-worth-it" heading="When refinancing may not make sense">
        <P>Refinancing can be the wrong move when:</P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>You plan to sell or move before reaching the break-even point.</li>
          <li>
            Your current rate is already well below today's market, so there is little to
            save.
          </li>
          <li>
            Resetting to a fresh 30-year term would add more total interest than the rate
            savings recover.
          </li>
          <li>
            The closing costs are high relative to the monthly savings, pushing break-even far
            out.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="questions" heading="Questions to ask before applying">
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>What are my total closing costs, all in?</li>
          <li>How much will my payment actually drop each month?</li>
          <li>What is my break-even point in months?</li>
          <li>How long do I realistically plan to keep this home and loan?</li>
          <li>Am I resetting my term, and what does that do to total interest?</li>
          <li>Is a rate-and-term, cash-out, or HELOC the right tool for my goal?</li>
        </ul>
      </ArticleSection>
    </ArticleLayout>
  );
}
