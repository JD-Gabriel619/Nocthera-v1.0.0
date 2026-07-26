import { randomUUID } from 'crypto';

const PANEL_KEY = guildId => `nocthera:panels:${guildId}`;

export default class PanelStore {
    constructor(database) {
        this.db = database;
    }

    async getPanels(guildId) {
        return (await this.db.get(PANEL_KEY(guildId))) ?? [];
    }

    async savePanels(guildId, panels) {
        await this.db.set(PANEL_KEY(guildId), panels);
        return panels;
    }

    async create(guildId, panelData) {
        const panels = await this.getPanels(guildId);

        const panel = {
            id: randomUUID(),

            guildId,

            channelId: null,
            messageId: null,

            type: "panel",

            name: "Untitled Panel",

            createdAt: Date.now(),
            updatedAt: Date.now(),

            enabled: true,

            embed: {},

            components: [],

            settings: {},

            ...panelData
        };

        panels.push(panel);

        await this.savePanels(guildId, panels);

        return panel;
    }

    async get(guildId, panelId) {
        const panels = await this.getPanels(guildId);

        return panels.find(p => p.id === panelId) ?? null;
    }

    async getByMessage(guildId, messageId) {
        const panels = await this.getPanels(guildId);

        return panels.find(p => p.messageId === messageId) ?? null;
    }

    async update(guildId, panelId, updates) {
        const panels = await this.getPanels(guildId);

        const index = panels.findIndex(p => p.id === panelId);

        if (index === -1)
            return null;

        panels[index] = {
            ...panels[index],
            ...updates,
            updatedAt: Date.now()
        };

        await this.savePanels(guildId, panels);

        return panels[index];
    }

    async delete(guildId, panelId) {
        const panels = await this.getPanels(guildId);

        const filtered = panels.filter(p => p.id !== panelId);

        await this.savePanels(guildId, filtered);

        return true;
    }

    async exists(guildId, panelId) {
        return (await this.get(guildId, panelId)) !== null;
    }

    async duplicate(guildId, panelId) {
        const original = await this.get(guildId, panelId);

        if (!original)
            return null;

        delete original.id;

        return this.create(guildId, {
            ...original,
            name: `${original.name} (Copy)`
        });
    }
}