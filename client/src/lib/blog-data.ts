export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  datePublished?: string;
  dateModified?: string;
  excerpt: string;
  content: string[];
  faqs: { question: string; answer: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cash-out-refi-vs-heloc-2026",
    title: "Should You Cash-Out Refi or Take a HELOC in 2026?",
    date: "May 12, 2026",
    excerpt:
      "Rates shifted, equity is up, and homeowners are weighing their options. Here's how to think through the cash-out refi vs. HELOC decision in today's market.",
    content: [
      "If you've owned your home for a few years, chances are you're sitting on significant equity. The question I get almost daily right now is: should I do a cash-out refinance or open a HELOC? The honest answer is — it depends on what you're trying to accomplish.",
      "A cash-out refinance replaces your existing mortgage with a new, larger loan. You pocket the difference in cash at closing. The upside: one payment, one rate, and if you can lock in a rate that works for you, your payment is predictable for the life of the loan. The downside: you're resetting the clock on your mortgage and paying closing costs, typically 2–3% of the loan amount.",
      "A HELOC (Home Equity Line of Credit) is a revolving line of credit secured by your home — more like a credit card than a loan. You draw what you need, when you need it. This makes HELOCs excellent for ongoing expenses like renovations or business capital needs where you don't know the exact total upfront. The trade-off is variable rates. In a rising rate environment, your monthly payment can climb.",
      "Here's my general rule of thumb: if you need a large lump sum for a specific purpose — paying off high-interest debt, funding a major purchase, or investing — and today's rate works for your overall picture, the cash-out refi often makes more sense. If your rate on your current mortgage is significantly lower than today's market and you want flexibility, a HELOC lets you access equity without touching your first mortgage.",
      "The best answer always comes from running the actual numbers on your specific situation. That's what I do every day. Schedule a call and let's look at your equity position together.",
    ],
    faqs: [
      {
        question: "How much equity do I need to do a cash-out refinance?",
        answer:
          "Most lenders require you to retain at least 20% equity after the cash-out, meaning you can typically borrow up to 80% of your home's current appraised value. Some programs go higher, but 80% LTV is the most common benchmark.",
      },
      {
        question: "Are HELOC rates fixed or variable?",
        answer:
          "Most HELOCs carry variable interest rates tied to the prime rate, which means your payment can change month to month. Some lenders offer fixed-rate HELOC options or the ability to lock a portion of your balance at a fixed rate.",
      },
      {
        question: "Can I do a cash-out refi on an investment property?",
        answer:
          "Yes — investment property cash-out refinances are available, though the guidelines are stricter. You typically need a lower LTV (70–75%), a stronger credit profile, and you'll pay a higher rate than on a primary residence. DSCR loans can be a great alternative for investors.",
      },
    ],
  },
  {
    slug: "scottsdale-home-equity-2026",
    title: "What Scottsdale Homeowners Need to Know About Home Equity Right Now",
    date: "April 28, 2026",
    excerpt:
      "Scottsdale home values have climbed steadily. Here's what that means for your borrowing power — and how to use it wisely.",
    content: [
      "If you bought a home in Scottsdale or the greater Phoenix metro area in the last five to seven years, you're likely sitting on a substantial amount of equity. The market has appreciated considerably, and many homeowners I talk to are surprised by how much their home is now worth.",
      "The average Scottsdale homeowner who purchased in 2019 has seen meaningful appreciation. That equity isn't just a number on a statement — it's real borrowing power you can put to work. Whether that's funding a remodel, consolidating higher-interest debt, investing in another property, or building a cash reserve, there are real strategic ways to use what you've built.",
      "The most common options I walk clients through are: cash-out refinance, HELOC, or a home equity loan. Each has its strengths depending on your current rate, your goals, and your timeline. For Scottsdale homeowners who locked in rates in the 2–4% range, a HELOC often makes the most sense because it lets you access equity without disturbing your first mortgage.",
      "One thing I always tell clients: don't let equity sit idle just because you're uncertain about the market. The equity in your home doesn't earn interest — it's inert until you put it to work. A conversation with a good loan officer costs you nothing and gives you a clear picture of your options.",
      "I work with homeowners throughout Scottsdale, Paradise Valley, Tempe, Mesa, and across Arizona. If you want to know what your home equity position looks like and what options are available to you, reach out. I'll pull a quick analysis and walk you through it on a call.",
    ],
    faqs: [
      {
        question: "How do I find out how much equity I have?",
        answer:
          "Your equity is the difference between your home's current market value and your remaining mortgage balance. A quick way to estimate is to look at recent comparable sales in your neighborhood, then subtract what you owe. I can also pull a more accurate estimate during our consultation.",
      },
      {
        question: "Does pulling equity from my home affect my credit?",
        answer:
          "Applying for a HELOC or refinance will result in a hard credit inquiry, which can temporarily lower your score by a few points. However, responsibly using and repaying a home equity product can actually strengthen your credit profile over time.",
      },
      {
        question: "What's the difference between a home equity loan and a HELOC?",
        answer:
          "A home equity loan gives you a lump sum at a fixed rate, with predictable monthly payments — similar to a second mortgage. A HELOC is a revolving credit line you draw from as needed. Home equity loans are better when you know exactly what you need; HELOCs are better for ongoing or uncertain expenses.",
      },
    ],
  },
  {
    slug: "va-loans-explained",
    title: "VA Loans Explained: A Loan Officer's Honest Breakdown",
    date: "April 10, 2026",
    excerpt:
      "VA loans are one of the best mortgage products available — but there's a lot of misinformation out there. Here's the straight truth from someone who closes them regularly.",
    content: [
      "I've worked with dozens of veterans and active-duty service members to close VA loans, and I'll tell you plainly: the VA loan program is one of the most powerful tools in residential lending. No down payment, no private mortgage insurance, and competitive interest rates. For those who qualify, it's genuinely hard to beat.",
      "The VA loan is available to eligible veterans, active-duty military, National Guard members, Reservists, and surviving spouses of veterans. Eligibility is determined by a Certificate of Eligibility (COE), which I can pull for you directly during the loan process — you don't need to track it down yourself.",
      "One of the biggest misconceptions I hear is that VA loans are slow or difficult for sellers to accept. While this was more of an issue in past years, it's largely not true today. VA appraisals follow standard timelines, and a well-prepared offer from a VA buyer is just as competitive as any other. What matters most is working with a loan officer who knows VA guidelines and can communicate clearly with listing agents.",
      "Another common myth: you can only use your VA benefit once. False. As long as you have remaining entitlement — or restore your entitlement by selling a previous home — you can use your VA benefit again. I've helped clients use VA financing on multiple purchases over the years.",
      "If you're a veteran and haven't explored whether a VA loan is right for your next purchase or refinance, let's talk. You've earned this benefit — let's make sure you're using it.",
    ],
    faqs: [
      {
        question: "Do VA loans require a down payment?",
        answer:
          "No — VA loans offer 100% financing with no down payment required for eligible borrowers with full entitlement. This is one of the primary advantages of the VA loan program and a major benefit for veterans looking to purchase without a large cash reserve.",
      },
      {
        question: "What is the VA funding fee?",
        answer:
          "The VA funding fee is a one-time fee paid at closing that helps fund the VA loan program. For most first-time VA loan users, the fee is 2.15% of the loan amount. It can be rolled into the loan so you don't pay it out of pocket. Veterans with a service-connected disability rating may be exempt from the fee entirely.",
      },
      {
        question: "Can I use a VA loan to buy an investment property?",
        answer:
          "VA loans are intended for primary residences, so you cannot use them to buy a straight investment property. However, you can purchase a multi-unit property (up to 4 units) with a VA loan as long as you occupy one of the units as your primary residence.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
