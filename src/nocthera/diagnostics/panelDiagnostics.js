import {
    loadPanels
} from "../storage/panelStorage.js";

export async function diagnose(client, guildId) {

    const guild = await client.guilds.fetch(guildId);

    const panels = await loadPanels(guildId);

    const report = [];

    for (const panel of panels) {

        const issues = [];

        const channel = await guild.channels
            .fetch(panel.channelId)
            .catch(() => null);

        if (!channel) {

            issues.push({
                type: "missing_channel",
                value: panel.channelId
            });

        } else {

            const message = await channel.messages
                .fetch(panel.messageId)
                .catch(() => null);

            if (!message) {

                issues.push({
                    type: "missing_message",
                    value: panel.messageId
                });

            }

        }

        for (const embed of panel.embeds ?? []) {

            if (!embed.title && !embed.description) {

                issues.push({
                    type: "empty_embed"
                });

            }

        }

        for (const row of panel.components ?? []) {

            for (const component of row.components ?? []) {

                if (
                    component.type === 2 &&
                    !component.custom_id &&
                    !component.url
                ) {

                    issues.push({
                        type: "broken_button"
                    });

                }

                if (
                    component.type === 3 &&
                    (!component.options || component.options.length === 0)
                ) {

                    issues.push({
                        type: "empty_select"
                    });

                }

            }

        }

        report.push({

            panelId: panel.id,

            healthy: issues.length === 0,

            issues

        });

    }

    return report;

}

export default {
    diagnose
};