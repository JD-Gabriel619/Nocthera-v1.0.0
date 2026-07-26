/**
 * Nocthera Slash Command System
 * Made / Rebuilded by JD Gabriel
 */

import { CommandRegistry, discoverCommands } from './registry.js';
import { loadCommands } from './loader.js';
import { deployCommands, deployGuildCommands } from './deploy.js';

export { CommandRegistry, discoverCommands, loadCommands, deployCommands, deployGuildCommands };

export async function initializeCommands(client) {
  const registry = new CommandRegistry(client);
  client.commandRegistry = registry;
  client.commands = registry.commands;
  await loadCommands(client, registry);
  return registry;
}

export default {
  initializeCommands,
  loadCommands,
  deployCommands,
  deployGuildCommands,
  CommandRegistry,
};
