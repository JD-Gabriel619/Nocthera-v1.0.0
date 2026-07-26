import { handleApplicationModal } from "../../commands/Community/apply.js";
import {
    handleInteractionError,
    createError,
    ErrorTypes
} from "../../utils/errorHandler.js";
import { logger } from "../../utils/logger.js";

export async function routeModal(
    interaction,
    client,
    interactionTraceContext,
    withTraceContext
) {

    // Application modal
    if (interaction.customId.startsWith("app_modal_")) {

        try {

            await handleApplicationModal(interaction);

        } catch (error) {

            await handleInteractionError(
                interaction,
                error,
                withTraceContext(
                    {
                        type: "modal",
                        customId: interaction.customId,
                        handler: "application"
                    },
                    interactionTraceContext
                )
            );

        }

        return;

    }

    // Inline awaited modals
    if (
        interaction.customId.startsWith("app_review_") ||
        interaction.customId.startsWith("jtc_") ||
        interaction.customId.startsWith("config_wizard_modal:") ||
        interaction.customId.startsWith("log_dash_channel_modal:") ||
        interaction.customId.startsWith("log_dash_filter_modal:")
    ) {

        logger.debug(
            `Skipping modal lookup: ${interaction.customId}`,
            {
                traceId: interactionTraceContext.traceId
            }
        );

        return;

    }

    const [customId, ...args] =
        interaction.customId.split(":");

    const modal =
        client.modals.get(customId);

    if (!modal) {

        if (!interaction.customId.includes(":"))
            return;

        throw createError(
            `No modal handler found for ${customId}`,
            ErrorTypes.CONFIGURATION,
            "This form is not available.",
            withTraceContext(
                { customId },
                interactionTraceContext
            )
        );

    }

    try {

        await modal.execute(
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
                    type: "modal",
                    customId: interaction.customId,
                    handler: "general"
                },
                interactionTraceContext
            )
        );

    }

}