import {
    savePanel
} from "../storage/panelStorage.js";

export async function importPanel(guildId, json) {

    const panel = JSON.parse(json);

    panel.guildId = guildId;

    panel.messageId = null;

    panel.createdAt = Date.now();

    panel.updatedAt = Date.now();

    await savePanel(guildId, panel);

    return panel;

}

export default {
    importPanel
};