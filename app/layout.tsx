import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClaudeStack — Ship your AI SaaS in days',
  description: 'The complete Next.js starter with Claude integration, auth, payments, and dashboard. Stop building boilerplate.',
  keywords: ['next.js', 'claude', 'ai', 'saas', 'starter', 'template', 'anthropic', 'typescript'],
  authors: [{ name: 'Cuong Dao', url: 'https://github.com/cuongproit' }],
  openGraph: {
    title: 'ClaudeStack — Ship your AI SaaS in days',
    description: 'Next.js starter with Claude integration, auth, payments, dashboard.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
