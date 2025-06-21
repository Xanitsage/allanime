// src/app/api/recommend/route.ts
import { NextRequest } from 'next/server';
import { openai } from '../../../lib/openai';

export async function POST(req: NextRequest) {
  const { userId, watchHistory } = await req.json();
  // Example prompt, customize for your use case
  const prompt = `Recommend 5 trending anime for a user who watched: ${watchHistory.join(', ')}`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return Response.json({ recommendations: completion.choices[0].message.content });
}
