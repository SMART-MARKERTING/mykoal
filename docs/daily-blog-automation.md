# Daily Blog Automation

This repo now supports a scheduled daily SEO blog draft workflow.

## How it works

- GitHub Actions runs `.github/workflows/daily-seo-blog.yml` once per day at `14:00 UTC`.
- The workflow runs `npm run blog:generate`.
- `scripts/generate-daily-blog.mjs` calls the OpenAI Responses API with Structured Outputs.
- The script prepends one generated post to `client/src/lib/blog-data.ts`.
- The script also ensures every `/blog/{slug}` URL is present in `client/public/sitemap.xml`.
- The workflow runs `npm run check` and `npm run build`.
- If files changed, the workflow opens a draft PR. It does not auto-publish.

## Required GitHub setup

Add this repository secret:

- `OPENAI_API_KEY`: OpenAI API key used by the scheduled generator.

Optional repository variable:

- `OPENAI_MODEL`: Defaults to `gpt-5.5` if unset.

## Why draft PRs

Mortgage content needs review before it goes live. The generator prompt blocks rates, APRs,
payments, fees, guarantees, and approval claims, but a human should still review each post for:

- compliance language,
- factual accuracy,
- local-market references,
- tone,
- CTA fit,
- duplicate topic risk.

Merging the draft PR triggers the normal Cloudflare Pages deployment from `main`.

## Manual test

Dry run without calling OpenAI:

```bash
npm run blog:generate:dry-run
```

Generate a post locally:

```bash
OPENAI_API_KEY=... npm run blog:generate
```

Override the generated date:

```bash
BLOG_DATE=2026-07-09 OPENAI_API_KEY=... npm run blog:generate
```
