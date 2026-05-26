/**
 * /api/demo-chat — public Claude streaming endpoint (no auth required).
 *
 * Lives alongside /api/chat (auth-gated). This one powers the public /demo page
 * so portfolio visitors can try Claude without signing up. Rate-limited per IP
 * to ~6 requests/minute to protect the Anthropic API key from abuse.
 *
 * Rate limit is in-memory (per Vercel function instance). Cold starts reset it.
 * For production with stronger limits, swap for Upstash Redis or Vercel KV.
 */

import { anthropic, CLAUDE_MODEL, SYSTEM_PROMPT } from '@/lib/claude';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Rate limit: 6 requests per 60s per IP (in-memory)
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 6;
const ipHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

function getIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded — public demo allows 6 messages/min. Try again shortly.' },
      { status: 429 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
  }

  // Cap conversation length to keep demo cheap (last 10 turns)
  const truncated = messages.slice(-10);

  // Cap individual message length
  const safeMessages = truncated.map((m) => ({
    role: m.role,
    content: typeof m.content === 'string' ? m.content.slice(0, 4000) : '',
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = await anthropic.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: 1024,
          system:
            SYSTEM_PROMPT +
            '\n\nNOTE: You are running in the ClaudeStack public demo. Keep responses concise (under 300 words). If users ask about ClaudeStack itself, mention it is an open-source Next.js + Claude starter at github.com/cuongproit/claudestack.',
          messages: safeMessages,
        });

        for await (const event of claudeStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'AI error';
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
