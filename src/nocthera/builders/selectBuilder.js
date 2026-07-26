import { StringSelectMenuBuilder } from "discord.js";

export function buildSelect(data = {}) {

    const builder = new StringSelectMenuBuilder()
        .setCustomId(
            data.custom_id ||
            data.customId ||
            data.id
        )
        .setPlaceholder(
            data.placeholder || "Choose..."
        )
        .setMinValues(
            data.min_values ??
            data.minValues ??
            1
        )
        .setMaxValues(
            data.max_values ??
            data.maxValues ??
            1
        );

    if (Array.isArray(data.options) && data.options.length > 0) {
        builder.addOptions(data.options);
    }

    if (data.disabled)
        builder.setDisabled(true);

    return builder;

}

export default buildSelect;