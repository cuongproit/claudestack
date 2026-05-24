import { Sparkles, Shield, CreditCard, Database, Palette, Zap, Code, Layers } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Claude AI integrated',
    description: 'Streaming chat with Claude Sonnet 4.5 wired through the Vercel AI SDK. Swap models with one config change.',
  },
  {
    icon: Shield,
    title: 'Auth that works',
    description: 'Email + password and magic-link auth via Better Auth. Session management, password reset, all handled.',
  },
  {
    icon: CreditCard,
    title: 'Payments-ready',
    description: 'Three-tier pricing page wired for Stripe. Webhook scaffolding included — drop in your keys and ship.',
  },
  {
    icon: Database,
    title: 'Type-safe DB',
    description: 'Drizzle ORM with SQLite for dev and Turso for prod. Migrations + studio UI included out of the box.',
  },
  {
    icon: Palette,
    title: 'Polished UI',
    description: 'shadcn/ui components, dark mode, mobile-responsive, gradient mesh backgrounds. Looks shipped on day one.',
  },
  {
    icon: Zap,
    title: 'Edge-ready',
    description: 'Built on Next.js 15 App Router. Stream from edge, server actions, RSC — all the modern primitives.',
  },
  {
    icon: Code,
    title: 'Clean code',
    description: 'TypeScript strict mode, ESLint configured, feature-folder architecture. Read like prose, scale like product.',
  },
  {
    icon: Layers,
    title: 'One-click deploy',
    description: 'Push to GitHub, import to Vercel. Production environment in 90 seconds. Zero-config edge functions.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Everything you need, nothing you don't</h2>
          <p className="text-lg text-muted-foreground">
            Production-grade primitives so you can focus on the parts that make your product unique.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border bg-card p-6 transition-all hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100 dark:hover:border-violet-800 dark:hover:shadow-violet-950"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-200 dark:bg-violet-950 dark:text-violet-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
