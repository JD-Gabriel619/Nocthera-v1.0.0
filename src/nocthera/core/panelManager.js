import PanelStore from '../database/panelStore.js';

export default class PanelManager {
    constructor(database) {
        this.store = new PanelStore(database);
    }

    /**
     * Create a new panel
     */
    async create(guildId, data = {}) {
        return this.store.create(guildId, data);
    }

    /**
     * Get one panel
     */
    async get(guildId, panelId) {
        return this.store.get(guildId, panelId);
    }

    /**
     * Get panel by Discord message ID
     */
    async getByMessage(guildId, messageId) {
        return this.store.getByMessage(guildId, messageId);
    }

    /**
     * List all panels
     */
    async list(guildId) {
        return this.store.getPanels(guildId);
    }

    /**
     * Update panel
     */
    async update(guildId, panelId, updates) {
        return this.store.update(guildId, panelId, updates);
    }

    /**
     * Delete panel
     */
    async delete(guildId, panelId) {
        return this.store.delete(guildId, panelId);
    }

    /**
     * Clone panel
     */
    async clone(guildId, panelId) {
        return this.store.duplicate(guildId, panelId);
    }

    /**
     * Enable panel
     */
    async enable(guildId, panelId) {
        return this.update(guildId, panelId, {
            enabled: true
        });
    }

    /**
     * Disable panel
     */
    async disable(guildId, panelId) {
        return this.update(guildId, panelId, {
            enabled: false
        });
    }

    /**
     * Publish panel
     */
    async publish(guildId, panelId, channelId, messageId) {
        return this.update(guildId, panelId, {
            channelId,
            messageId,
            publishedAt: Date.now()
        });
    }

    /**
     * Replace embed
     */
    async setEmbed(guildId, panelId, embed) {
        return this.update(guildId, panelId, {
            embed
        });
    }

    /**
     * Replace components
     */
    async setComponents(guildId, panelId, components) {
        return this.update(guildId, panelId, {
            components
        });
    }

    /**
     * Replace settings
     */
    async setSettings(guildId, panelId, settings) {
        return this.update(guildId, panelId, {
            settings
        });
    }
}