import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    EmbedBuilder
} from "discord.js";

function convertButtonStyle(style) {

    if (typeof style === "number")
        return style;

    switch ((style || "").toLowerCase()) {

        case "primary":
            return ButtonStyle.Primary;

        case "secondary":
            return ButtonStyle.Secondary;

        case "success":
            return ButtonStyle.Success;

        case "danger":
            return ButtonStyle.Danger;

        case "link":
            return ButtonStyle.Link;

        default:
            return ButtonStyle.Primary;
    }
}

function buildEmbed(data) {

    const embed = new EmbedBuilder();

    if (data.title)
        embed.setTitle(data.title);

    if (data.description)
        embed.setDescription(data.description);

    if (data.color)
        embed.setColor(data.color);

    if (data.footer)
        embed.setFooter(data.footer);

    if (data.author)
        embed.setAuthor(data.author);

    if (data.thumbnail)
        embed.setThumbnail(data.thumbnail.url || data.thumbnail);

    if (data.image)
        embed.setImage(data.image.url || data.image);

    if (Array.isArray(data.fields))
        embed.addFields(data.fields);

    if (data.timestamp)
        embed.setTimestamp();

    return embed;

}

function buildButton(button) {

    const builder = new ButtonBuilder()
        .setLabel(button.label || "Button")
        .setStyle(convertButtonStyle(button.style));

    if (button.style === 5 || button.url) {

        builder.setURL(button.url);

    } else {

        builder.setCustomId(button.custom_id || button.customId);

    }

    if (button.emoji)
        builder.setEmoji(button.emoji);

    if (button.disabled)
        builder.setDisabled(true);

    return builder;

}

function buildSelect(menu) {

    const builder = new StringSelectMenuBuilder()
        .setCustomId(menu.custom_id || menu.customId)
        .setPlaceholder(menu.placeholder || "Choose...")
        .setMinValues(menu.min_values || 1)
        .setMaxValues(menu.max_values || 1);

    if (Array.isArray(menu.options) && menu.options.length > 0) {
    builder.addOptions(menu.options);
}
    if (menu.disabled)
        builder.setDisabled(true);
    return builder;

}

export function renderPanel(panel) {

    const embeds = [];
    const components = [];

    if (Array.isArray(json.embeds)) {

        for (const embed of json.embeds)
            embeds.push(buildEmbed(embed));

    }

    if (Array.isArray(json.components)) {

        for (const row of json.components) {

            const actionRow = new ActionRowBuilder();

            for (const component of row.components) {

                switch (component.type) {

                    case 2:
                        actionRow.addComponents(
                            buildButton(component)
                        );
                        break;
                
                    case 3:
                        actionRow.addComponents(
                            buildSelect(component)
                        );
                        break;

                    default:
                        break;

                }

            }

            if (actionRow.components.length > 0)
                components.push(actionRow);

        }

    }

    return {

        embeds,
        components

    };

}