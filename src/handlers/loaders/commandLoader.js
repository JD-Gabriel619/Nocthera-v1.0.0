/**
 * Nocthera command bridge — loads & deploys src/nocthera/commands only.
 * Made / Rebuilded by JD Gabriel
 */

import {
  initializeCommands,
  loadCommands as noctheraLoadCommands,
  deployCommands as noctheraDeployCommands,
} from '../../nocthera/commands/index.js';
import { logger } from '../../utils/logger.js';

export async function loadCommands(client) {
  const registry = await initializeCommands(client);
  const size =
    typeof registry.size === 'function'
      ? registry.size()
      : client.commands?.size ?? client.commands?.size?.() ?? 0;
  logger.info(`[Nocthera] Command system ready (${size} slash commands)`);
  return client.commands;
}

export async function registerCommands(client, options = {}) {
  if (!client.commandRegistry) {
    await initializeCommands(client);
  }
  await noctheraDeployCommands(client);
  const size =
    typeof client.commandRegistry?.size === 'function'
      ? client.commandRegistry.size()
      : client.commands?.size ?? 0;
  return { registered: size };
}

export async function reloadCommand(client, commandName) {
  await noctheraLoadCommands(client, client.commandRegistry);
  return {
    success: client.commandRegistry?.has?.(commandName) ?? false,
    message: `Reloaded command registry (requested: ${commandName})`,
  };
}

export default { loadCommands, registerCommands, reloadCommand };
