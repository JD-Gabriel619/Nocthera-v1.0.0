import { Colors } from "discord.js";

const HEX = /^#([A-Fa-f0-9]{6})$/;

export function validateWizard(data) {

    const errors = [];

    if (!data.name?.trim()) {
        errors.push("Panel name is required.");
    }

    if (data.name && data.name.length > 100) {
        errors.push("Panel name cannot exceed 100 characters.");
    }

    if (data.embed?.title?.length > 256) {
        errors.push("Embed title is too long.");
    }

    if (data.embed?.description?.length > 4096) {
        errors.push("Embed description is too long.");
    }

    if (data.embed?.color) {

        if (
            !HEX.test(data.embed.color) &&
            !Object.values(Colors).includes(data.embed.color)
        ) {
            errors.push("Invalid embed color.");
        }

    }

    if (data.components) {

        for (const row of data.components) {

            if (row.length > 5) {
                errors.push("A row may contain at most 5 components.");
            }

            for (const component of row) {

                if (!component.type)
                    errors.push("Component type missing.");

                if (component.type === "button") {

                    if (!component.label)
                        errors.push("Button label missing.");

                    if (
                        component.style === "Link" &&
                        !component.url
                    ) {
                        errors.push(
                            `Link button "${component.label}" has no URL.`
                        );
                    }

                    if (
                        component.style !== "Link" &&
                        !component.id
                    ) {
                        errors.push(
                            `Button "${component.label}" has no custom ID.`
                        );
                    }

                }

                if (component.type === "select") {

                    if (!component.options?.length) {
                        errors.push(
                            "Select menu requires at least one option."
                        );
                    }

                }

            }

        }

    }

    return {
        valid: errors.length === 0,
        errors
    };
}