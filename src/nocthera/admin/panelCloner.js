import {
    loadPanel,
    savePanel
} from "../storage/panelStorage.js";

import {
    publishPanel
} from "../publisher/panelPublisher.js";

export async function clone(client, guildId, panelId, overrides = {}) {

    const original = await loadPanel(guildId, panelId);

    if (!original)
        throw new Error("Panel not found.");

    const panel = structuredClone(original);

    panel.id = crypto.randomUUID();

    panel.messageId = null;

    panel.createdAt = Date.now();

    panel.updatedAt = Date.now();

    Object.assign(panel, overrides);

    await savePanel(guildId, panel);

    await publishPanel(client, panel);

    return panel;

}

export default {
    clone
};