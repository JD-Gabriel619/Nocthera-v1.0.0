import {
    getPanels
} from "../storage/index.js";

import {
    updatePublishedPanel,
    publishPanel
} from "../publisher/index.js";

export async function recoverGuild(client, guildId) {

    const panels = await getPanels(guildId);

    const guild = await client.guilds.fetch(guildId);

    let restored = 0;

    for (const panel of panels) {

        const channel = await guild.channels
            .fetch(panel.channelId)
            .catch(() => null);

        if (!channel)
            continue;

        const message = await channel.messages
            .fetch(panel.messageId)
            .catch(() => null);

        if (message) {

            await updatePublishedPanel(client, panel);

        } else {

            await publishPanel(client, panel);

        }

        restored++;

    }

    return restored;

}

export async function recoverAll(client) {

    let restored = 0;

    for (const guild of client.guilds.cache.values()) {

        restored += await recoverGuild(
            client,
            guild.id
        );

    }

    return restored;

}

export default {
    recoverGuild,
    recoverAll
};