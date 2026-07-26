import {
    handleInteractionError,
    createError,
    ErrorTypes
} from "../../utils/errorHandler.js";

import { isCollectorManagedComponent } from "../../utils/collectorComponents.js";

export async function routeSelectMenu(
    interaction,
    client,
    interactionTraceContext,
    withTraceContext
) {

    const [customId, ...args] =
        interaction.customId.split(":");

    const selectMenu =
        client.selectMenus.get(customId);

    if (!selectMenu) {

        if (
            !interaction.customId.includes(":") ||
            isCollectorManagedComponent(customId)
        ) {
            return;
        }

        throw createError(
            `No select menu handler found for ${customId}`,
            ErrorTypes.CONFIGURATION,
            "This select menu is not available.",
            withTraceContext(
                { customId },
                interactionTraceContext
            )
        );

    }

    try {

        await selectMenu.execute(
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
                    type: "select_menu",
                    customId: interaction.customId
                },
                interactionTraceContext
            )
        );

    }

}