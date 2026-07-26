/**
 * Nocthera Universal Panel Parser
 *
 * Detects JSON exported from:
 * - Carl-bot
 * - Discohook
 * - Discord Embed Builder
 * - Raw Discord API
 * - Nocthera
 */

export default class PanelParser {

    static parse(json) {

        if (typeof json === "string") {
            json = JSON.parse(json);
        }

        return {
            embeds: json.embeds ?? [],
            components: this.parseComponents(json.components ?? []),
            metadata: {
                source: this.detectSource(json)
            }
        };
    }

    static detectSource(json) {

        if (json.nocthera === true)
            return "nocthera";

        if (json.version && json.author)
            return "carlbot";

        if (json.messages)
            return "discohook";

        return "discord";
    }

    static parseComponents(rows) {

        const components = [];

        for (const row of rows) {

            if (!row.components)
                continue;

            for (const component of row.components) {

                components.push(this.parseComponent(component));

            }

        }

        return components;
    }

    static parseComponent(component) {

        return {

            type: component.type,

            style: component.style,

            label: component.label,

            emoji: component.emoji,

            customId: component.custom_id,

            url: component.url,

            disabled: component.disabled ?? false

        };

    }

}