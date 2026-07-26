import MessageBuilder from "../builders/messageBuilder.js";
import {
    savePanel
} from "../panels/panelStorage.js";

export async function publishPanel(client, panel) {

    const guild = await client.guilds.fetch(panel.guildId);

    const channel = await guild.channels.fetch(panel.channelId);

    if (!channel) {
        throw new Error("Channel not found.");
    }

    const message = await channel.send(
        MessageBuilder.build(panel)
    );

    panel.messageId = message.id;

    panel.createdAt = Date.now();

    panel.updatedAt = Date.now();

    await savePanel(
        panel.guildId,
        panel
    );

    return message;

}

export async function updatePublishedPanel(client, panel) {

    const guild = await client.guilds.fetch(panel.guildId);

    const channel = await guild.channels.fetch(panel.channelId);

    if (!channel) {
        throw new Error("Channel not found.");
    }

    const message = await channel.messages.fetch(
        panel.messageId
    );

    await message.edit(
        MessageBuilder.build(panel)
    );

    panel.updatedAt = Date.now();

    await savePanel(
        panel.guildId,
        panel
    );

    return message;

}

export async function deletePublishedPanel(client, panel) {

    const guild = await client.guilds.fetch(panel.guildId);

    const channel = await guild.channels.fetch(panel.channelId);

    if (!channel)
        return;

    const message = await channel.messages
        .fetch(panel.messageId)
        .catch(() => null);

    if (message)
        await message.delete();

}

export default {
    publishPanel,
    updatePublishedPanel,
    deletePublishedPanel
};