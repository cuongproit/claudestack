import Link from 'next/link';
import { ArrowRight, Github, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-mesh py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300 animate-fade-in-up">
            <Zap className="h-4 w-4" />
            <span>Built for Claude Sonnet 4.5</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl animate-fade-in-up">
            Ship your{' '}
            <span className="text-gradient">AI SaaS</span>
            <br />
            in days, not months
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in-up">
            The complete Next.js starter with Claude integration, auth, payments, and a dashboard
            already wired up. Stop building boilerplate — start building your actual product.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/demo">
                <Sparkles className="mr-2 h-4 w-4" /> Try the live demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/cuongproit/claudestack" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Star on GitHub
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/signup">
                Start building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center text-sm text-muted-foreground md:flex md:justify-center md:gap-12">
            <div><span className="block text-2xl font-bold text-foreground">7</span>days saved on boilerplate</div>
            <div><span className="block text-2xl font-bold text-foreground">15+</span>pre-built components</div>
            <div><span className="block text-2xl font-bold text-foreground">100%</span>type-safe end-to-end</div>
          </div>
        </div>
      </div>
    </section>
  );
}
