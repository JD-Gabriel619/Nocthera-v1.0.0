import MessageBuilder from "../builders/messageBuilder.js";
import * as Metrics from "../metrics/index.js";

const previews = new Map();

export async function createPreview(interaction, panel) {

    const message = await interaction.reply({
        ...MessageBuilder.build(panel),
        fetchReply: true
    });

    previews.set(interaction.user.id, {
        guildId: interaction.guildId,
        channelId: interaction.channelId,
        messageId: message.id
    });

    Metrics.increment("previewCreated");

    return message;

}

export async function updatePreview(interaction, panel) {

    const preview = previews.get(interaction.user.id);

    if (!preview)
        return createPreview(interaction, panel);

    const message = await interaction.channel.messages
        .fetch(preview.messageId)
        .catch(() => null);

    if (!message)
        return createPreview(interaction, panel);

    await message.edit(
        MessageBuilder.build(panel)
    );

    Metrics.increment("previewUpdated");

    return message;

}

export function removePreview(userId) {

    const removed = previews.delete(userId);

    if (removed)
        Metrics.increment("previewRemoved");

    return removed;

}

export function getPreview(userId) {

    return previews.get(userId) ?? null;

}

export function clearPreviews() {

    previews.clear();

}

export default {

    createPreview,
    updatePreview,
    removePreview,
    getPreview,
    clearPreviews

};