import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('⚠️  ANTHROPIC_API_KEY is not set. AI features will not work.');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key-for-build',
});

export const CLAUDE_MODEL = 'claude-sonnet-4-5-20250929' as const;

export const SYSTEM_PROMPT = `You are a helpful AI assistant for ClaudeStack users.
Be concise, practical, and direct. Format your answers with markdown when helpful.
If you don't know something, say so — don't make up information.`;
