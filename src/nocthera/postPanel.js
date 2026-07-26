import { renderPanel } from "./renderPanel.js";
import { updatePanel } from "./panelService.js";

export async function postPanel(client, guildId, channelId, panel) {

    const guild = client.guilds.cache.get(guildId);

    if (!guild)
        throw new Error("Guild not found.");

    const channel = guild.channels.cache.get(channelId);

    if (!channel)
        throw new Error("Channel not found.");

    const rendered = renderPanel(panel.json);

    const message = await channel.send({
        embeds: rendered.embeds,
        components: rendered.components
    });

    panel.channelId = channel.id;
    panel.messageId = message.id;

    await updatePanel(client, guildId, panel.id, panel);

    return message;

}

export async function editPanel(client, guildId, panel) {

    const guild = client.guilds.cache.get(guildId);

    if (!guild)
        throw new Error("Guild not found.");

    const channel = guild.channels.cache.get(panel.channelId);

    if (!channel)
        throw new Error("Channel not found.");

    const message = await channel.messages.fetch(panel.messageId);

    if (!message)
        throw new Error("Message not found.");

    const rendered = renderPanel(panel.json);

    await message.edit({
        embeds: rendered.embeds,
        components: rendered.components
    });

    return message;

}

export async function repostPanel(client, guildId, panel) {

    if (panel.channelId && panel.messageId) {

        try {

            const guild = client.guilds.cache.get(guildId);

            const channel = guild.channels.cache.get(panel.channelId);

            const msg = await channel.messages.fetch(panel.messageId);

            await msg.delete().catch(() => {});

        } catch {}

    }

    return postPanel(
        client,
        guildId,
        panel.channelId,
        panel
    );

}