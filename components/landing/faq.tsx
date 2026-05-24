'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How is this different from create-next-app?',
    a: 'create-next-app gives you an empty Next.js app. ClaudeStack gives you a working AI SaaS: auth, payments, dashboard, Claude integration, dark mode, deploy config — all wired together with consistent patterns. You spend day one customizing for your product, not setting up the basics.',
  },
  {
    q: 'Do I need to know Claude API specifically?',
    a: "No. We've abstracted the integration via the Vercel AI SDK. You write your prompts and call useChat() — the SDK handles streaming, errors, and rate limits. Swap to OpenAI or any other provider with one line.",
  },
  {
    q: 'Can I use this for client projects?',
    a: 'Yes. MIT licensed, attribution appreciated but not required. Many indie consultants use ClaudeStack as their default starter and bill the saved hours to clients.',
  },
  {
    q: 'What about Stripe and payments?',
    a: 'The pricing page and subscription model are wired up. Drop in your Stripe keys and the webhook handlers work. Free tier checks live in the same place — no scattered if-statements across your app.',
  },
  {
    q: "I'm not on Vercel — can I deploy elsewhere?",
    a: 'Of course. ClaudeStack is plain Next.js. Deploy to Railway, Fly.io, Cloudflare Pages, or your own VPS. Edge functions degrade gracefully to Node serverless on platforms without edge support.',
  },
  {
    q: 'Will you maintain this long-term?',
    a: "Yes. We use ClaudeStack as the starter for our own client projects, so it stays current with the Next.js, Claude API, and shadcn/ui ecosystems. Updates ship monthly.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
          <p className="text-lg text-muted-foreground">Real answers, not marketing fluff.</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border bg-card">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', openIndex === i && 'rotate-180')} />
              </button>
              <div className={cn('overflow-hidden transition-all', openIndex === i ? 'max-h-96' : 'max-h-0')}>
                <p className="px-6 pb-6 text-muted-foreground">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
