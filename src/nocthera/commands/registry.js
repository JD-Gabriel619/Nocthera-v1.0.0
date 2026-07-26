import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { Collection } from 'discord.js';

const IGNORE = new Set(['index.js', 'loader.js', 'registry.js', 'deploy.js']);

export class CommandRegistry {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
  }

  register(command) {
    if (!command) throw new Error('Invalid command.');
    if (!command.data) throw new Error('Command is missing SlashCommandBuilder data.');
    if (typeof command.execute !== 'function') {
      throw new Error(`${command.data?.name || 'unknown'} is missing execute().`);
    }
    this.commands.set(command.data.name, command);
  }

  unregister(name) {
    this.commands.delete(name);
  }

  get(name) {
    return this.commands.get(name);
  }

  has(name) {
    return this.commands.has(name);
  }

  values() {
    return [...this.commands.values()];
  }

  size() {
    return this.commands.size;
  }

  clear() {
    this.commands.clear();
  }
}

async function walk(directory) {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(location)));
      continue;
    }
    if (!entry.name.endsWith('.js')) continue;
    if (IGNORE.has(entry.name)) continue;
    files.push(location);
  }
  return files;
}

export async function discoverCommands(registry, commandsDirectory) {
  const files = await walk(commandsDirectory);
  const loaded = [];

  for (const file of files) {
    try {
      const mod = await import(pathToFileURL(file).href);
      const command = mod.default ?? mod.command;
      if (!command?.data || typeof command.execute !== 'function') continue;
      registry.register(command);
      loaded.push(command);
    } catch (error) {
      console.error(`[Nocthera] Failed to load command ${file}:`, error.message);
    }
  }

  return loaded;
}

export default { CommandRegistry, discoverCommands };
