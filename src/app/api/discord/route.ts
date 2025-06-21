// src/app/api/discord/route.ts
import { NextRequest } from 'next/server';
// Fix import path for discord
import { sendDiscordMessage } from '../../../lib/discord';

export async function POST(req: NextRequest) {
  const { channelId, content } = await req.json();
  await sendDiscordMessage(channelId, content);
  return Response.json({ status: 'sent' });
}
