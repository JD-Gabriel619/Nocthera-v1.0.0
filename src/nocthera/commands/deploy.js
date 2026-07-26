import { Routes } from 'discord.js';
import { logger } from '../../utils/logger.js';

export async function deployCommands(client) {
  if (!client.commandRegistry) {
    throw new Error('Command registry has not been initialized.');
  }

  const clientId = client.config?.bot?.clientId || process.env.CLIENT_ID;
  if (!clientId) {
    throw new Error('CLIENT_ID is required for slash command deployment.');
  }
  if (!client.rest) {
    throw new Error('Discord REST client is not available.');
  }

  const commands = client.commandRegistry.values().map((command) => command.data.toJSON());

  logger.info(`[Nocthera] Deploying ${commands.length} slash command(s)...`);

  await client.rest.put(Routes.applicationCommands(clientId), {
    body: commands,
  });

  logger.info(`[Nocthera] Successfully deployed ${commands.length} slash command(s).`);
  return { registered: commands.length };
}

export async function deployGuildCommands(client, guildId) {
  if (!client.commandRegistry) {
    throw new Error('Command registry has not been initialized.');
  }

  const clientId = client.config?.bot?.clientId || process.env.CLIENT_ID;
  if (!clientId) {
    throw new Error('CLIENT_ID is required for guild command deployment.');
  }

  const commands = client.commandRegistry.values().map((command) => command.data.toJSON());

  logger.info(`[Nocthera] Deploying ${commands.length} guild command(s) to ${guildId}...`);

  await client.rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });

  logger.info('[Nocthera] Guild command deployment completed.');
  return { registered: commands.length };
}

export default { deployCommands, deployGuildCommands };
