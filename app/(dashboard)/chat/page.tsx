'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    // Add placeholder assistant message
    const aiMsgId = crypto.randomUUID();
    setMessages((m) => [...m, { id: aiMsgId, role: 'assistant', content: '' }]);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) =>
          m.map((msg) => (msg.id === aiMsgId ? { ...msg, content: acc } : msg))
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMessages((m) =>
        m.map((message) =>
          message.id === aiMsgId
            ? { ...message, content: `Sorry — something went wrong (${msg}).` }
            : message
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Chat</h1>
        <p className="text-muted-foreground">Powered by Claude Sonnet 4.5 — streaming responses, markdown rendering.</p>
      </div>

      <Card className="flex h-[calc(100vh-14rem)] flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <EmptyState onPrompt={(t) => setInput(t)} />
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {loading && messages[messages.length - 1]?.content === '' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Claude is thinking…
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="border-t bg-muted/30 p-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Claude anything..."
              disabled={loading}
              className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" variant="gradient" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function EmptyState({ onPrompt }: { onPrompt: (t: string) => void }) {
  const prompts = [
    'Explain how Next.js App Router differs from Pages Router',
    'Write a SQL query to find duplicate rows in a Postgres table',
    'How does prompt caching work in the Anthropic API?',
    'Give me a Tailwind class for a glass-morphism card',
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Start a conversation</h2>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">
        Ask anything. Claude is great at code, writing, analysis, and explanations.
      </p>
      <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => onPrompt(p)}
            className="rounded-lg border bg-card p-3 text-left text-sm transition-colors hover:bg-accent"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
        isUser ? 'bg-accent' : 'bg-gradient-to-br from-violet-600 to-fuchsia-600'
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-white" />}
      </div>
      <div className={cn(
        'rounded-2xl px-4 py-2.5 max-w-[80%]',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        {message.content ? (
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-pre:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
      </div>
    </div>
  );
}
