import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold">ClaudeStack</span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground">
              The complete Next.js starter for AI SaaS. Built by full-stack engineers who hate
              writing the same boilerplate twice.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="https://github.com/cuongproit/claudestack" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="https://github.com/cuongproit/claudestack" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Claude docs</Link></li>
              <li><Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ClaudeStack. MIT licensed. Built by{' '}
          <Link href="https://github.com/cuongproit" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            cuongproit
          </Link>.
        </div>
      </div>
    </footer>
  );
}
