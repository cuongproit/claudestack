import Link from 'next/link';
import { headers } from 'next/headers';
import { MessageSquare, Sparkles, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const name = session?.user?.name || 'there';
  const firstName = name.split(' ')[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {firstName} 👋</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="AI messages this month" value="0 / 50" icon={MessageSquare} change="Free tier" />
        <StatCard title="Active conversations" value="0" icon={Sparkles} change="Start your first chat" />
        <StatCard title="Account plan" value="Free" icon={Zap} change="Upgrade to Pro for $29/mo" />
      </div>

      <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:border-violet-900 dark:from-violet-950 dark:to-fuchsia-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" /> Try the AI chat
          </CardTitle>
          <CardDescription>
            Chat with Claude Sonnet 4.5 — streaming, markdown rendering, conversation history. The whole thing in one click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="gradient" asChild>
            <Link href="/chat">Open chat <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> What&apos;s next
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ChecklistItem done>Sign up</ChecklistItem>
          <ChecklistItem>Send your first AI message in the chat</ChecklistItem>
          <ChecklistItem>Read the README on GitHub to customize</ChecklistItem>
          <ChecklistItem>Add your Anthropic API key in <code className="rounded bg-muted px-1.5 py-0.5 text-xs">.env</code></ChecklistItem>
          <ChecklistItem>Deploy to Vercel with one click</ChecklistItem>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, change }: { title: string; value: string; icon: typeof Sparkles; change: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}

function ChecklistItem({ done, children }: { done?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <div className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${done ? 'border-violet-600 bg-violet-600' : 'border-muted'} flex items-center justify-center`}>
        {done && <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M4.5 8.5L2 6l-.7.7L4.5 9.9 10.7 3.7l-.7-.7z" /></svg>}
      </div>
      <span className={done ? 'text-muted-foreground line-through' : ''}>{children}</span>
    </div>
  );
}
