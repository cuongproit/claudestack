# ClaudeStack

> The complete Next.js 15 starter for AI SaaS — Claude integration, auth, payments-ready, and a polished dashboard, all wired together.

Stop writing the same boilerplate twice. Ship the part that makes your product unique.

[**Live demo →**](https://claudestack.vercel.app) (placeholder URL — deploy your own in 90s)

![ClaudeStack hero](https://placehold.co/1200x600/8b5cf6/ffffff?text=ClaudeStack+%E2%80%94+Ship+your+AI+SaaS+in+days&font=inter)

---

## What's inside

| Layer | Tech | Why |
|-------|------|-----|
| Framework | Next.js 15 App Router | Modern primitives — RSC, server actions, streaming |
| Language | TypeScript strict | Type-safe end to end |
| Styling | Tailwind + shadcn/ui | Looks shipped on day one |
| AI | `@anthropic-ai/sdk` + Vercel AI SDK | Claude Sonnet 4.5 streaming, swap models with one line |
| Auth | Better Auth | Email + password, magic links, sessions — no NextAuth setup pain |
| Database | Drizzle ORM + libsql/Turso | Type-safe queries, migrations, studio UI. SQLite for dev, Turso for prod |
| Payments | Stripe-ready | Pricing page wired, webhook scaffold included |
| Dark mode | next-themes | System / manual toggle |
| Deploy | Vercel-ready | Edge functions, one-click deploy |

## Quick start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn — adjust commands)

### Install

```bash
git clone https://github.com/cuongproit/claudestack.git
cd claudestack
pnpm install
```

### Configure

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

Required:
- `ANTHROPIC_API_KEY` — get one from [console.anthropic.com](https://console.anthropic.com)
- `BETTER_AUTH_SECRET` — generate with `openssl rand -base64 32`

Optional (defaults work for local dev):
- `DATABASE_URL` — defaults to `file:./local.db` (SQLite). Set to a `libsql://` URL for Turso production.

### Initialize the database

```bash
pnpm db:push
```

This creates `local.db` with all tables. For Turso production, set `DATABASE_URL` first.

### Run

```bash
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Sign up, hit the AI chat, ship.

---

## Project structure

```
claudestack/
├── app/
│   ├── (auth)/              # Login + signup routes
│   ├── (dashboard)/         # Authenticated routes
│   │   ├── dashboard/
│   │   └── chat/            # AI chat UI
│   ├── api/
│   │   ├── auth/[...all]/   # Better Auth catch-all
│   │   └── chat/            # Claude streaming endpoint
│   ├── layout.tsx
│   ├── page.tsx             # Landing page
│   └── globals.css
├── components/
│   ├── landing/             # Hero, features, pricing, FAQ, footer
│   ├── ui/                  # shadcn/ui primitives
│   └── theme-provider.tsx
├── lib/
│   ├── auth.ts              # Better Auth server config
│   ├── auth-client.ts       # React client for auth
│   ├── claude.ts            # Anthropic SDK instance
│   ├── db.ts                # Drizzle client
│   └── utils.ts
├── db/
│   └── schema.ts            # Drizzle schema
└── drizzle.config.ts
```

## Customize

### Change the AI model

Edit `lib/claude.ts`:

```ts
export const CLAUDE_MODEL = 'claude-opus-4-5' as const; // bigger
// or
export const CLAUDE_MODEL = 'claude-haiku-4-5' as const; // cheaper
```

### Add a new dashboard route

```bash
mkdir app/\(dashboard\)/billing
touch app/\(dashboard\)/billing/page.tsx
```

Drop in a server component, it inherits auth from `(dashboard)/layout.tsx` automatically.

### Connect Stripe

```bash
pnpm add stripe @stripe/stripe-js
```

Add to `.env`:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Pricing page is already wired — just create products in Stripe dashboard and reference them in `components/landing/pricing.tsx`.

### Switch from SQLite to Postgres

```ts
// drizzle.config.ts
dialect: 'postgresql',
// lib/db.ts — swap to drizzle-orm/node-postgres
```

Tables map cleanly — Drizzle handles the dialect differences.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` and `BETTER_AUTH_SECRET` env vars
4. Set `DATABASE_URL` to a Turso URL (run `turso db create claudestack`)
5. Deploy

Edge functions just work. No additional config.

## Roadmap

- [ ] Magic-link auth via Resend
- [ ] Per-user usage tracking + soft caps
- [ ] Conversation history persistence (DB tables already there, UI pending)
- [ ] Stripe webhook handler example
- [ ] Multi-tenant team workspaces
- [ ] Admin panel
- [ ] OG image generation
- [ ] E2E tests with Playwright

## License

MIT. Use it for client work, your own SaaS, anything. Attribution appreciated but not required.

## Author

Built by [Cuong Dao](https://github.com/cuongproit) — full-stack engineer specializing in AI-integrated web apps. Available for client work via [Upwork](https://upwork.com) and direct inquiries.

If ClaudeStack saves you a week, ⭐ the repo. If you build something with it, I'd love to see — tag me anywhere.
