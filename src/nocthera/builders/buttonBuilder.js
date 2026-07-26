import { ButtonBuilder, ButtonStyle } from "discord.js";

function convertStyle(style) {

    if (typeof style === "number")
        return style;

    switch (String(style || "").toLowerCase()) {

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

export function buildButton(data = {}) {

    const builder = new ButtonBuilder()
        .setLabel(data.label || "Button")
        .setStyle(convertStyle(data.style));

    if (builder.data.style === ButtonStyle.Link || data.url) {

        builder.setURL(data.url);

    } else {

        builder.setCustomId(
            data.custom_id ||
            data.customId ||
            data.id
        );

    }

    if (data.emoji)
        builder.setEmoji(data.emoji);

    if (data.disabled)
        builder.setDisabled(true);

    return builder;

}

export default buildButton;