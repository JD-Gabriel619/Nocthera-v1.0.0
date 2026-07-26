import path from 'path';
import { fileURLToPath } from 'url';
import { CommandRegistry, discoverCommands } from './registry.js';
import { logger } from '../../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, registry = null) {
  if (!registry) {
    registry = new CommandRegistry(client);
  }

  registry.clear();

  const commands = await discoverCommands(registry, __dirname);

  client.commandRegistry = registry;
  client.commands = registry.commands;

  for (const cmd of commands) {
    logger.info(`[Nocthera] Loaded /${cmd.data.name}${cmd.category ? ` (${cmd.category})` : ''}`);
  }

  logger.info(`[Nocthera] Loaded ${commands.length} slash command(s).`);
  return registry;
}

export default loadCommands;
