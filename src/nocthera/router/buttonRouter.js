import { executeAction } from "../actionRouter.js";
import { handleInteractionError, createError, ErrorTypes } from "../../utils/errorHandler.js";
import { isCollectorManagedComponent } from "../../utils/collectorComponents.js";

export async function routeButton(
    interaction,
    client,
    interactionTraceContext,
    withTraceContext
) {

    // Nocthera Universal Panels
    try {

        const handled = await executeAction(interaction);

        if (handled)
            return;

    } catch (error) {

        await handleInteractionError(
            interaction,
            error,
            withTraceContext(
                {
                    type: "button",
                    customId: interaction.customId,
                    handler: "nocthera"
                },
                interactionTraceContext
            )
        );

        return;

    }

    // Legacy Todo
    if (interaction.customId.startsWith("shared_todo_")) {

        const parts = interaction.customId.split("_");

        const buttonType = parts.slice(0, 3).join("_");

        const listId = parts.slice(3).join("_");

        const button = client.buttons.get(buttonType);

        if (!button) {

            throw createError(
                `No button handler found for ${buttonType}`,
                ErrorTypes.CONFIGURATION,
                "This button is not available.",
                withTraceContext(
                    { buttonType },
                    interactionTraceContext
                )
            );

        }

        try {

            await button.execute(
                interaction,
                client,
                [listId]
            );

        } catch (error) {

            await handleInteractionError(
                interaction,
                error,
                withTraceContext(
                    {
                        type: "button",
                        customId: interaction.customId,
                        handler: "todo"
                    },
                    interactionTraceContext
                )
            );

        }

        return;

    }

    // Legacy Buttons
    const [customId, ...args] =
        interaction.customId.split(":");

    const button =
        client.buttons.get(customId);

    if (!button) {

        if (
            !interaction.customId.includes(":") ||
            isCollectorManagedComponent(customId)
        ) {
            return;
        }

        throw createError(
            `No button handler found for ${customId}`,
            ErrorTypes.CONFIGURATION,
            "This button is not available.",
            withTraceContext(
                { customId },
                interactionTraceContext
            )
        );

    }

    try {

        await button.execute(
            interaction,
            client,
            args
        );

    } catch (error) {

        await handleInteractionError(
            interaction,
            error,
            withTraceContext(
                {
                    type: "button",
                    customId: interaction.customId,
                    handler: "general"
                },
                interactionTraceContext
            )
        );

    }

}