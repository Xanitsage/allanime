// src/lib/discord.ts
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);

export async function sendDiscordMessage(channelId: string, content: string) {
  return rest.post(Routes.channelMessages(channelId), { body: { content } });
}
