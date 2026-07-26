import {
    loadPanels,
    savePanel,
    deletePanel
} from "../storage/panelStorage.js";

import {
    publishPanel
} from "../publisher/panelPublisher.js";

export async function autoRepair(client, guildId) {

    const guild = await client.guilds.fetch(guildId);

    const panels = await loadPanels(guildId);

    const repaired = [];
    const removed = [];

    for (const panel of panels) {

        let changed = false;

        // Required fields
        panel.embeds ??= [];
        panel.components ??= [];

        panel.createdAt ??= Date.now();
        panel.updatedAt ??= Date.now();

        // Remove broken buttons
        for (const row of panel.components) {

            row.components = (row.components ?? []).filter(component => {

                if (component.type === 2) {

                    return !!(component.custom_id || component.url);

                }

                if (component.type === 3) {

                    return Array.isArray(component.options);

                }

                return true;

            });

        }

        const channel = await guild.channels
            .fetch(panel.channelId)
            .catch(() => null);

        if (!channel) {

            await deletePanel(guildId, panel.id);

            removed.push(panel.id);

            continue;

        }

        const message = await channel.messages
            .fetch(panel.messageId)
            .catch(() => null);

        if (!message) {

            await publishPanel(client, panel);

            changed = true;

        }

        if (changed) {

            panel.updatedAt = Date.now();

            await savePanel(guildId, panel);

            repaired.push(panel.id);

        }

    }

    return {

        repaired,

        removed

    };

}

export default {
    autoRepair
};