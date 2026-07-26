import crypto from "crypto";

import {
    loadPanel,
    savePanel,
    deletePanel,
    getPanels
} from "./storage/panelStorage.js";

import {
    renderPanel,
    refreshPanel,
    deletePanel as deleteDiscordPanel
} from "./panelRenderer.js";

export default class PanelManager {

    static async create(client, guildId, data) {

        const id = crypto.randomUUID();

        const panel = {

            id,

            enabled: true,

            createdAt: Date.now(),

            updatedAt: Date.now(),

            ...data

        };

        await savePanel(guildId, panel);

        return panel;

    }

    static async publish(client, guildId, panelId) {

        return renderPanel(
            client,
            guildId,
            panelId
        );

    }

    static async refresh(client, guildId, panelId) {

        return refreshPanel(
            client,
            guildId,
            panelId
        );

    }

    static async get(guildId, panelId) {

        return loadPanel(
            guildId,
            panelId
        );

    }

    static async list(guildId) {

        return getPanels(guildId);

    }

    static async update(client, guildId, panelId, changes) {

        const panel = await loadPanel(
            guildId,
            panelId
        );

        if (!panel)
            return null;

        Object.assign(panel, changes);

        panel.updatedAt = Date.now();

        await savePanel(
            guildId,
            panel
        );

        if (panel.messageId) {

            await refreshPanel(
                client,
                guildId,
                panelId
            );

        }

        return panel;

    }

    static async remove(client, guildId, panelId) {

        const panel = await loadPanel(
            guildId,
            panelId
        );

        if (!panel)
            return;

        if (panel.messageId) {

            await deleteDiscordPanel(
                client,
                guildId,
                panelId
            );

        }

        await deletePanel(
            guildId,
            panelId
        );

    }

    static async enable(client, guildId, panelId) {

        return this.update(
            client,
            guildId,
            panelId,
            {
                enabled: true
            }
        );

    }

    static async disable(client, guildId, panelId) {

        return this.update(
            client,
            guildId,
            panelId,
            {
                enabled: false
            }
        );

    }

}