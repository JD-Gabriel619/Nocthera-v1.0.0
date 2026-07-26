import MessageBuilder from "./builders/messageBuilder.js";

import { PanelStorage } from "./panels/panelStorage.js";

import { validatePanel } from "./validation/index.js";

import * as Metrics from "./metrics/index.js";

import { validatePanel } from "../validation/index.js";

export async function renderPanel(client, guildId, panelId) {

    const panel = await PanelStorage.get(
    guildId,
    panelId
);

    if (!panel)
        throw new Error("Panel not found.");

    const guild = await client.guilds.fetch(guildId);

    const channel = await guild.channels.fetch(panel.channelId);

    if (!channel)
        throw new Error("Channel not found.");
const validation = validatePanel(panel);

if (!validation.valid) {

    throw new Error(
        validation.errors.join("\n")
    );

}
    const messageData = MessageBuilder.build(panel);

    const message = await channel.send(messageData);

    panel.messageId = message.id;
    
    Metrics.increment("panelsPublished");

    await PanelStorage.save(panel);

    return message;

}

export async function refreshPanel(client, guildId, panelId) {

    const panel = await PanelStorage.get(
        guildId,
        panelId
    );

    if (!panel)
        return null;

    const guild = await client.guilds.fetch(guildId);

    const channel = await guild.channels.fetch(panel.channelId);

    const oldMessage = await channel.messages.fetch(panel.messageId).catch(() => null);

    const validation = validatePanel(panel);

    if (!validation.valid) {

        throw new Error(
            validation.errors.join("\n")
        );

}

    const built = MessageBuilder.build(panel);

    if (oldMessage) {

        await oldMessage.edit(built);

        Metrics.increment("panelsEdited");

        return oldMessage;

    }

    return renderPanel(client, guildId, panelId);

}

export async function deletePanel(client, guildId, panelId) {

    const panel = await PanelStorage.get(
    guildId,
    panelId
);

    if (!panel)
        return;

    const guild = await client.guilds.fetch(guildId);

    const channel = await guild.channels.fetch(panel.channelId);

    const msg = await channel.messages.fetch(panel.messageId).catch(() => null);

    if (msg) {

    await msg.delete();

    Metrics.increment("panelsDeleted");

}
    await PanelStorage.delete(
        guildId,
        panelId
    );