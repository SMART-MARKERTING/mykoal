import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_DATA_PATH = path.join(ROOT, "client", "src", "lib", "blog-data.ts");
const SITEMAP_PATH = path.join(ROOT, "client", "public", "sitemap.xml");
const SITE_URL = "https://mykoal.com";
const DEFAULT_MODEL = "gpt-5.5";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

const TOPICS = [
  {
    keyword: "cash-out refinance vs HELOC",
    audience: "homeowners with equity",
    angle: "how to compare access to equity without assuming one option is always best",
  },
  {
    keyword: "Arizona DSCR loans",
    audience: "real estate investors",
    angle: "what lenders usually review before financing a rental property",
  },
  {
    keyword: "VA cash-out refinance",
    audience: "veterans and active-duty borrowers",
    angle: "when tapping equity through a VA-backed refinance may or may not fit",
  },
  {
    keyword: "Scottsdale home equity",
    audience: "Scottsdale and Phoenix-area homeowners",
    angle: "practical ways to evaluate home equity before borrowing against it",
  },
  {
    keyword: "self-employed mortgage documentation",
    audience: "self-employed borrowers",
    angle: "how to prepare cleaner income documentation before applying",
  },
  {
    keyword: "rate-and-term refinance",
    audience: "homeowners reviewing monthly cash flow",
    angle: "how to decide whether a refinance is worth a deeper quote review",
  },
  {
    keyword: "investment property mortgage options",
    audience: "new and experienced rental property buyers",
    angle: "how conventional, DSCR, and other investor programs differ at a high level",
  },
  {
    keyword: "FHA vs conventional loans",
    audience: "first-time and move-up homebuyers",
    angle: "how to compare program fit without focusing only on down payment",
  },
];

const BLOG_POST_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    slug: { type: "string" },
    title: { type: "string" },
    date: { type: "string" },
    datePublished: { type: "string" },
    dateModified: { type: "string" },
    excerpt: { type: "string" },
    content: { type: "array", items: { type: "string" } },
    faqs: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "answer"],
      },
    },
  },
  required: [
    "slug",
    "title",
    "date",
    "datePublished",
    "dateModified",
    "excerpt",
    "content",
    "faqs",
  ],
};

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, value) {
  fs.writeFileSync(filePath, value, "utf8");
}

function todayIso() {
  return process.env.BLOG_DATE || new Date().toISOString().slice(0, 10);
}

function displayDate(isoDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Phoenix",
  }).format(new Date(`${isoDate}T12:00:00Z`));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getExistingSlugs(source) {
  return Array.from(source.matchAll(/slug:\s*"([^"]+)"/g)).map((match) => match[1]);
}

function selectTopic(existingSlugs, isoDate) {
  const daySeed = Math.floor(new Date(`${isoDate}T00:00:00Z`).getTime() / 86_400_000);
  for (let offset = 0; offset < TOPICS.length; offset += 1) {
    const topic = TOPICS[(daySeed + offset) % TOPICS.length];
    const baseSlug = slugify(`${topic.keyword}-${isoDate.slice(0, 4)}`);
    if (!existingSlugs.some((slug) => slug.startsWith(baseSlug))) {
      return topic;
    }
  }
  return TOPICS[daySeed % TOPICS.length];
}

function extractResponseText(responseJson) {
  if (typeof responseJson.output_text === "string") return responseJson.output_text;

  const chunks = [];
  for (const item of responseJson.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

async function generatePost({ topic, isoDate, existingSlugs }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required to generate a daily blog post.");
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const prompt = {
    task: "Generate one SEO blog post for mykoal.com.",
    site_context:
      "Mykoal DeShazo is a Vice President and Senior Loan Officer at Adaxa Home LLC. Audience is mortgage borrowers, homeowners, veterans, investors, and self-employed borrowers in licensed states.",
    topic,
    date: displayDate(isoDate),
    datePublished: isoDate,
    existingSlugs,
    output_rules: [
      "Return only the JSON object matching the schema.",
      "Use ASCII punctuation.",
      "Use a clear, search-oriented title.",
      "Write 5 to 7 concise paragraphs in content.",
      "Write exactly 3 FAQs.",
      "Do not quote specific rates, APRs, payments, fees, or market statistics.",
      "Do not promise approval, savings, speed, eligibility, or financial outcomes.",
      "Keep advice educational and tell readers that actual options depend on application, underwriting, property, credit, income, and program guidelines.",
      "Mention Adaxa Home LLC and NMLS #2380533 only if context requires it.",
      "Do not imply legal, tax, or financial advice.",
    ],
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      store: false,
      input: [
        {
          role: "system",
          content:
            "You generate compliant mortgage SEO blog drafts for a licensed loan officer. Be specific, practical, and conservative. Avoid regulatory or underwriting claims that need live verification.",
        },
        { role: "user", content: JSON.stringify(prompt) },
      ],
      text: {
        verbosity: "medium",
        format: {
          type: "json_schema",
          name: "daily_blog_post",
          strict: true,
          schema: BLOG_POST_SCHEMA,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API request failed: ${response.status} ${await response.text()}`);
  }

  const responseJson = await response.json();
  const outputText = extractResponseText(responseJson);
  if (!outputText) {
    throw new Error("OpenAI response did not include output text.");
  }
  return JSON.parse(outputText);
}

function normalizeAndValidatePost(post, { topic, isoDate, existingSlugs }) {
  const normalized = {
    ...post,
    slug: slugify(post.slug || post.title || topic.keyword),
    date: post.date || displayDate(isoDate),
    datePublished: post.datePublished || isoDate,
    dateModified: post.dateModified || isoDate,
  };

  if (!normalized.slug || existingSlugs.includes(normalized.slug)) {
    normalized.slug = slugify(`${topic.keyword}-${isoDate}`);
  }

  const failures = [];
  if (!normalized.title || normalized.title.length < 20) failures.push("title is too short");
  if (!normalized.excerpt || normalized.excerpt.length < 80) failures.push("excerpt is too short");
  if (!Array.isArray(normalized.content) || normalized.content.length < 5 || normalized.content.length > 7) {
    failures.push("content must contain 5 to 7 paragraphs");
  }
  if (!Array.isArray(normalized.faqs) || normalized.faqs.length !== 3) {
    failures.push("faqs must contain exactly 3 items");
  }
  for (const [i, para] of (normalized.content ?? []).entries()) {
    if (typeof para !== "string" || para.length < 120) failures.push(`paragraph ${i + 1} is too short`);
  }
  for (const [i, faq] of (normalized.faqs ?? []).entries()) {
    if (!faq?.question || !faq?.answer) failures.push(`faq ${i + 1} is incomplete`);
  }

  const combined = [
    normalized.title,
    normalized.excerpt,
    ...(normalized.content ?? []),
    ...(normalized.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");

  const forbidden = [
    /\bguarantee[sd]?\b/i,
    /\binstant approval\b/i,
    /\bno[- ]?cost\b/i,
    /\bwill save\b/i,
  ];
  if (forbidden.some((pattern) => pattern.test(combined))) {
    failures.push("content contains a prohibited claim pattern");
  }

  if (failures.length > 0) {
    throw new Error(`Generated post failed validation: ${failures.join("; ")}`);
  }

  return normalized;
}

function tsString(value) {
  return JSON.stringify(value);
}

function renderPost(post) {
  const content = post.content.map((para) => `      ${tsString(para)}`).join(",\n");
  const faqs = post.faqs
    .map(
      (faq) => `      {
        question: ${tsString(faq.question)},
        answer: ${tsString(faq.answer)},
      }`,
    )
    .join(",\n");

  return `  {
    slug: ${tsString(post.slug)},
    title: ${tsString(post.title)},
    date: ${tsString(post.date)},
    datePublished: ${tsString(post.datePublished)},
    dateModified: ${tsString(post.dateModified)},
    excerpt:
      ${tsString(post.excerpt)},
    content: [
${content}
    ],
    faqs: [
${faqs}
    ],
  }`;
}

function insertPost(source, post) {
  const marker = "export const blogPosts: BlogPost[] = [";
  const index = source.indexOf(marker);
  if (index === -1) throw new Error(`Could not find blogPosts marker in ${BLOG_DATA_PATH}`);
  const insertAt = index + marker.length;
  return `${source.slice(0, insertAt)}\n${renderPost(post)},${source.slice(insertAt)}`;
}

function ensureSitemapBlogUrls(slugs) {
  let sitemap = readText(SITEMAP_PATH);
  const additions = [];
  for (const slug of slugs) {
    const loc = `${SITE_URL}/blog/${slug}`;
    if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
    additions.push(`  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  if (additions.length === 0) return false;
  sitemap = sitemap.replace("</urlset>", `${additions.join("\n")}\n</urlset>`);
  writeText(SITEMAP_PATH, sitemap);
  return true;
}

async function main() {
  const source = readText(BLOG_DATA_PATH);
  const isoDate = todayIso();
  const existingSlugs = getExistingSlugs(source);

  if (source.includes(`datePublished: "${isoDate}"`)) {
    console.log(`A blog post for ${isoDate} already exists. No changes made.`);
    ensureSitemapBlogUrls(existingSlugs);
    return;
  }

  const topic = selectTopic(existingSlugs, isoDate);
  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          selectedTopic: topic,
          date: displayDate(isoDate),
          existingPostCount: existingSlugs.length,
          wouldUseModel: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        },
        null,
        2,
      ),
    );
    return;
  }

  const generated = await generatePost({ topic, isoDate, existingSlugs });
  const post = normalizeAndValidatePost(generated, { topic, isoDate, existingSlugs });

  writeText(BLOG_DATA_PATH, insertPost(source, post));
  ensureSitemapBlogUrls([post.slug, ...existingSlugs]);

  console.log(`Generated blog post: ${post.title}`);
  console.log(`Slug: ${post.slug}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
