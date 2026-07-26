import validateEmbed from "./embedValidator.js";
import validateComponent from "./componentValidator.js";

export function validatePanel(panel = {}) {

    const errors = [];

    if (!panel.id)
        errors.push("Panel id missing.");

    if (!panel.guildId)
        errors.push("Guild id missing.");

    if (!panel.channelId)
        errors.push("Channel id missing.");

    for (const embed of panel.embeds ?? []) {

        errors.push(
            ...validateEmbed(embed)
        );

    }

    for (const row of panel.components ?? []) {

        for (const component of row.components ?? []) {

            errors.push(
                ...validateComponent(component)
            );

        }

    }

    return {

        valid: errors.length === 0,

        errors

    };

}

export default {
    validatePanel
};