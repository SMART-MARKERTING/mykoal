import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_DATA_PATH = path.join(ROOT, "client", "src", "lib", "blog-data.ts");
const SITEMAP_PATH = path.join(ROOT, "client", "public", "sitemap.xml");
const SITE_URL = "https://mykoal.com";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemini-2.5-flash";
const MAX_GENERATION_ATTEMPTS = Math.max(
  1,
  Number.parseInt(process.env.BLOG_GENERATION_ATTEMPTS || "3", 10) || 3,
);
const RETRYABLE_STATUS_CODES = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

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
  {
    keyword: "private money lenders",
    audience: "real estate investors comparing short-term financing",
    angle: "how private money and hard money loans differ from traditional mortgage financing",
    relatedKeywords: [
      "private money lenders near me",
      "private money lenders for real estate",
      "hard money lenders near me",
      "private money real estate loans",
    ],
  },
  {
    keyword: "asset based real estate loans",
    audience: "investors and borrowers with property-based financing needs",
    angle: "what asset-based mortgage underwriting can and cannot solve",
    relatedKeywords: [
      "asset based mortgage",
      "asset-based lending for individuals",
      "asset-based lending mortgage",
      "asset based loan",
    ],
  },
  {
    keyword: "foreign national loans",
    audience: "non-US citizen borrowers and international real estate buyers",
    angle: "what foreign national mortgage borrowers should prepare before applying",
    relatedKeywords: [
      "foreign national mortgage loans",
      "foreign nationals mortgage",
      "home loan for non US citizen",
    ],
  },
  {
    keyword: "non qualified mortgage lenders",
    audience: "self-employed and non-traditional borrowers",
    angle: "what non-QM loans mean and when bank statement or P&L documentation may matter",
    relatedKeywords: [
      "non-QM loans meaning",
      "non-QM mortgage lenders",
      "bank statement mortgage",
      "P&L loan",
      "stated income loans",
    ],
  },
  {
    keyword: "blanket loan",
    audience: "real estate investors with multiple properties",
    angle: "how blanket mortgages work for portfolio financing",
    relatedKeywords: [
      "blanket mortgage",
      "blanket loan lenders",
      "real estate portfolio",
    ],
  },
  {
    keyword: "bridge loan",
    audience: "buyers and investors who need short-term transition financing",
    angle: "when bridge lending or a swing loan may be considered",
    relatedKeywords: [
      "bridge lending",
      "swing loan",
      "residential transition loans",
    ],
  },
  {
    keyword: "VA loan calculator",
    audience: "veterans and active-duty borrowers estimating mortgage scenarios",
    angle: "how to think about VA payment estimates without relying on a single calculator output",
    relatedKeywords: [
      "VA home loan calculator",
      "estimate VA loan payment",
      "VA mortgage calculator",
      "veteran mortgage calculator",
    ],
  },
  {
    keyword: "mortgage loan payoff calculator",
    audience: "homeowners comparing payoff and refinance options",
    angle: "how payoff calculators help evaluate principal reduction and refinance timing",
    relatedKeywords: [
      "estimated mortgage payoff calculator",
      "pay down mortgage calculator",
      "mortgage calculator what can I afford",
      "home loan affordability calculator",
    ],
  },
  {
    keyword: "APR vs interest rate",
    audience: "borrowers comparing loan estimates",
    angle: "why APR and interest rate are related but not the same number",
    relatedKeywords: [
      "interest rate vs APR",
      "apr or interest rate",
      "what does APR stand for",
    ],
  },
  {
    keyword: "USDA lenders",
    audience: "borrowers exploring government-backed home loan options",
    angle: "what to understand about USDA loan eligibility before comparing lenders",
    relatedKeywords: [
      "what is a USDA home loan",
      "USDA loan Oregon",
      "USDA loans CT",
      "USDA property eligibility",
    ],
  },
  {
    keyword: "capital gains tax on real estate",
    audience: "homeowners and investors planning around a sale",
    angle: "mortgage-adjacent planning questions to raise with a tax professional before selling property",
    relatedKeywords: [
      "capital gains tax on home sale",
      "property gain tax calculator",
      "SALT tax deduction",
      "cost segregation study",
    ],
  },
  {
    keyword: "wet funding states",
    audience: "borrowers who want to understand closing and funding timelines",
    angle: "how funding rules can affect when loan proceeds are available after closing",
    relatedKeywords: [
      "is Texas a wet funding state",
      "is Florida a wet funding state",
      "wet state funding",
    ],
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

function dailySlug(value, topic, isoDate) {
  const year = isoDate.slice(0, 4);
  const dateSuffix = isoDate;
  const raw = slugify(value || topic.keyword);
  if (raw.endsWith(`-${dateSuffix}`)) return raw;
  const base = raw.replace(new RegExp(`-${year}$`), "");
  return slugify(`${base}-${dateSuffix}`);
}

function extractResponseText(responseJson) {
  const messageContent = responseJson.choices?.[0]?.message?.content;
  if (typeof messageContent === "string") return messageContent.trim();
  if (Array.isArray(messageContent)) {
    return messageContent
      .map((part) => {
        if (typeof part === "string") return part;
        return part?.text ?? part?.content ?? "";
      })
      .join("\n")
      .trim();
  }

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

function normalizeApiKey(value) {
  return value?.trim().replace(/^Bearer\s+/i, "");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function compactPreview(value, maxLength = 220) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function extractBalancedJsonObject(value) {
  const start = value.indexOf("{");
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < value.length; i += 1) {
    const char = value[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) return value.slice(start, i + 1);
    }
  }

  return "";
}

function parseJsonObject(outputText) {
  const trimmed = outputText.trim();
  const candidates = [trimmed];

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) candidates.push(fenced[1].trim());

  const balanced = extractBalancedJsonObject(trimmed);
  if (balanced) candidates.push(balanced);

  let lastError;
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return JSON.parse(candidate);
    } catch (error) {
      lastError = error;
    }
  }

  const preview = compactPreview(outputText);
  const detail = lastError ? ` Last parser error: ${lastError.message}` : "";
  throw new Error(`Model response was not valid JSON. Preview: "${preview}".${detail}`);
}

async function generatePost({ topic, isoDate, existingSlugs, attempt = 1, feedback = "" }) {
  const apiKey = normalizeApiKey(process.env.OPENROUTER_API_KEY);
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is required to generate a daily blog post.");
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
  const prompt = {
    task: "Generate one SEO blog post for mykoal.com.",
    site_context:
      "Mykoal DeShazo is a Vice President and Senior Loan Officer at Adaxa Home LLC. Audience is mortgage borrowers, homeowners, veterans, investors, and self-employed borrowers in licensed states.",
    topic,
    date: displayDate(isoDate),
    datePublished: isoDate,
    existingSlugs,
    generationAttempt: attempt,
    previousAttemptFeedback: feedback ? compactPreview(feedback, 600) : undefined,
    output_rules: [
      "Return only the raw JSON object matching the schema. Start with { and end with }.",
      "Do not include markdown fences, commentary, labels, apologies, or prose outside the JSON object.",
      "Use ASCII punctuation.",
      "Use a clear, search-oriented title.",
      "Use the primary topic keyword naturally in the title, excerpt, and opening paragraph when it reads well.",
      "Use one or two relatedKeywords naturally when provided, but do not keyword-stuff.",
      "Do not include raw URLs or markdown links in content. The site template renders related links.",
      "Write 5 to 7 concise paragraphs in content.",
      "Make every content paragraph at least 120 characters.",
      "Write exactly 3 FAQs.",
      "Do not quote specific rates, APRs, payments, fees, or market statistics.",
      "Do not promise approval, savings, speed, eligibility, or financial outcomes.",
      "Keep advice educational and tell readers that actual options depend on application, underwriting, property, credit, income, and program guidelines.",
      "For tax-adjacent topics, state that readers should consult a qualified tax professional.",
      "Mention Adaxa Home LLC and NMLS #2380533 only if context requires it.",
      "Do not imply legal, tax, or financial advice.",
    ],
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SITE_URL,
      "X-OpenRouter-Title": "MyKoal Daily SEO Blog",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You generate compliant mortgage SEO blog drafts for a licensed loan officer. Be specific, practical, and conservative. Avoid regulatory or underwriting claims that need live verification.",
        },
        { role: "user", content: JSON.stringify(prompt) },
      ],
      temperature: 0.45,
      max_tokens: 3500,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "daily_blog_post",
          strict: true,
          schema: BLOG_POST_SCHEMA,
        },
      },
    }),
  });

  if (!response.ok) {
    const error = new Error(`OpenRouter API request failed: ${response.status} ${await response.text()}`);
    error.retryable = RETRYABLE_STATUS_CODES.has(response.status);
    throw error;
  }

  const responseJson = await response.json();
  const outputText = extractResponseText(responseJson);
  if (!outputText) {
    throw new Error("OpenRouter response did not include output text.");
  }
  return parseJsonObject(outputText);
}

async function generateValidPost({ topic, isoDate, existingSlugs }) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt += 1) {
    try {
      const generated = await generatePost({
        topic,
        isoDate,
        existingSlugs,
        attempt,
        feedback: lastError?.message || "",
      });
      const post = normalizeAndValidatePost(generated, { topic, isoDate, existingSlugs });
      if (attempt > 1) {
        console.log(`Generated valid blog post on attempt ${attempt}.`);
      }
      return post;
    } catch (error) {
      lastError = error;
      console.warn(`Blog generation attempt ${attempt} failed: ${error.message}`);
      if (attempt >= MAX_GENERATION_ATTEMPTS || error.retryable === false) {
        throw error;
      }
      await sleep(1000 * attempt);
    }
  }

  throw lastError || new Error("Blog generation failed before a post was created.");
}

function normalizeAndValidatePost(post, { topic, isoDate, existingSlugs }) {
  const normalized = {
    ...post,
    slug: dailySlug(post.slug || post.title || topic.keyword, topic, isoDate),
    date: post.date || displayDate(isoDate),
    datePublished: post.datePublished || isoDate,
    dateModified: post.dateModified || isoDate,
  };

  const baseSlug = normalized.slug;
  let nextSuffix = 2;
  if (!normalized.slug || existingSlugs.includes(normalized.slug)) {
    while (existingSlugs.includes(normalized.slug)) {
      normalized.slug = `${baseSlug}-${nextSuffix}`;
      nextSuffix += 1;
    }
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
    if (typeof para !== "string" || para.length < 100) failures.push(`paragraph ${i + 1} is too short`);
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
          wouldUseProvider: "OpenRouter",
          wouldUseModel: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
          maxGenerationAttempts: MAX_GENERATION_ATTEMPTS,
        },
        null,
        2,
      ),
    );
    return;
  }

  const post = await generateValidPost({ topic, isoDate, existingSlugs });

  writeText(BLOG_DATA_PATH, insertPost(source, post));
  ensureSitemapBlogUrls([post.slug, ...existingSlugs]);

  console.log(`Generated blog post: ${post.title}`);
  console.log(`Slug: ${post.slug}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
