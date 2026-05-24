import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying ClaudeStack out',
    features: [
      'Up to 50 AI messages / month',
      '1 user',
      'Community support',
      'GitHub access',
    ],
    cta: 'Start free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    description: 'For solo founders shipping their AI product',
    features: [
      '5,000 AI messages / month',
      'Priority Claude Sonnet 4.5',
      'Email support',
      'Custom domain',
      'Remove ClaudeStack branding',
      'Stripe payment integration',
    ],
    cta: 'Go Pro',
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$99',
    period: '/ month',
    description: 'For teams scaling AI features',
    features: [
      'Unlimited AI messages',
      'Up to 10 team members',
      'Dedicated support',
      'SSO + audit logs',
      'Custom integrations',
      '99.9% SLA',
    ],
    cta: 'Contact sales',
    href: '/signup?plan=team',
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, honest pricing</h2>
          <p className="text-lg text-muted-foreground">
            Start free. Upgrade when you have paying customers — not before.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative rounded-2xl border bg-card p-8 transition-all',
                tier.highlighted &&
                  'border-violet-300 shadow-xl shadow-violet-100 scale-105 dark:border-violet-700 dark:shadow-violet-950'
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-semibold text-white">
                  MOST POPULAR
                </div>
              )}

              <h3 className="mb-2 text-xl font-semibold">{tier.name}</h3>
              <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>

              <Button
                variant={tier.highlighted ? 'gradient' : 'outline'}
                className="mb-8 w-full"
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>

              <ul className="space-y-3 text-sm">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
