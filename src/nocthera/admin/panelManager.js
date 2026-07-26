import {
    loadPanel,
    loadPanels,
    savePanel,
    deletePanel
} from "../storage/panelStorage.js";

import {
    publishPanel,
    updatePublishedPanel
} from "../publisher/panelPublisher.js";

export async function create(client, panel) {

    await savePanel(panel.guildId, panel);

    return publishPanel(client, panel);

}

export async function edit(client, guildId, panelId, changes) {

    const panel = await loadPanel(guildId, panelId);

    if (!panel)
        throw new Error("Panel not found.");

    Object.assign(panel, changes);

    return updatePublishedPanel(client, panel);

}

export async function remove(client, guildId, panelId) {

    const panel = await loadPanel(guildId, panelId);

    if (!panel)
        return false;

    await deletePanel(client, guildId, panelId);

    return true;

}

export async function get(guildId, panelId) {

    return loadPanel(guildId, panelId);

}

export async function list(guildId) {

    return loadPanels(guildId);

}

export default {
    create,
    edit,
    remove,
    get,
    list
};