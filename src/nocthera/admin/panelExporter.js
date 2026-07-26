import { loadPanel } from "../storage/panelStorage.js";

export async function exportPanel(guildId, panelId) {

    const panel = await loadPanel(guildId, panelId);

    if (!panel)
        throw new Error("Panel not found.");

    return JSON.stringify(panel, null, 4);

}

export default {
    exportPanel
};