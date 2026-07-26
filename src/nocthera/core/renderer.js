import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder
} from "discord.js";

export default class Renderer {

    static render(panel) {

        return {

            embeds: this.renderEmbeds(panel.embed),

            components: this.renderComponents(panel.components)

        };

    }

    static renderEmbeds(embedData) {

        if (!embedData || Object.keys(embedData).length === 0)
            return [];

        return [

            EmbedBuilder.from(embedData)

        ];

    }

    static renderComponents(components = []) {

        if (!components.length)
            return [];

        const rows = [];

        let currentRow = new ActionRowBuilder();

        let count = 0;

        for (const component of components) {

            if (count === 5) {

                rows.push(currentRow);

                currentRow = new ActionRowBuilder();

                count = 0;

            }

            if (component.type === "button") {

                currentRow.addComponents(

                    this.buildButton(component)

                );

            }

            else if (component.type === "select") {

                currentRow.addComponents(

                    this.buildMenu(component)

                );

            }

            count++;

        }

        if (currentRow.components.length)

            rows.push(currentRow);

        return rows;

    }

    static buildButton(component) {

        const button = new ButtonBuilder()

            .setLabel(component.label ?? "Button")

            .setStyle(component.style ?? ButtonStyle.Primary)

            .setDisabled(component.disabled ?? false);

        if (component.emoji)

            button.setEmoji(component.emoji);

        if (component.url) {

            button.setURL(component.url);

        }

        else {

            button.setCustomId(component.customId);

        }

        return button;

    }

    static buildMenu(component) {

        return new StringSelectMenuBuilder()

            .setCustomId(component.customId)

            .setPlaceholder(component.placeholder ?? "Choose")

            .setMinValues(component.min ?? 1)

            .setMaxValues(component.max ?? 1)

            .addOptions(component.options ?? []);

    }

}