import {
    getNoctheraPanel,
    saveNoctheraPanel,
    deleteNoctheraPanel,
    getAllNoctheraPanels
} from './registry.js';

export async function createPanel(client, guildId, panel) {

    panel.createdAt = Date.now();
    panel.updatedAt = Date.now();

    await saveNoctheraPanel(client, guildId, panel);

    return panel;
}

export async function updatePanel(client, guildId, panelId, data) {

    const panel = await getNoctheraPanel(client, guildId, panelId);

    if (!panel)
        throw new Error("Panel not found.");

    Object.assign(panel, data);

    panel.updatedAt = Date.now();

    await saveNoctheraPanel(client, guildId, panel);

    return panel;
}

export async function removePanel(client, guildId, panelId) {

    await deleteNoctheraPanel(client, guildId, panelId);

}

export async function getPanel(client, guildId, panelId) {

    return getNoctheraPanel(client, guildId, panelId);

}

export async function listPanels(client, guildId) {

    return getAllNoctheraPanels(client, guildId);

}