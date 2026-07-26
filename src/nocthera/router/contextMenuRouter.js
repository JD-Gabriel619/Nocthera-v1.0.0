import {
    handleInteractionError,
    createError,
    ErrorTypes
} from "../../utils/errorHandler.js";

export async function routeContextMenu(
    interaction,
    client,
    interactionTraceContext,
    withTraceContext
) {

    const command =
        client.contextMenus?.get(interaction.commandName);

    if (!command) {

        throw createError(
            `No context menu found for ${interaction.commandName}`,
            ErrorTypes.CONFIGURATION,
            "This context menu is not available.",
            withTraceContext(
                {
                    type: "context_menu",
                    commandName: interaction.commandName
                },
                interactionTraceContext
            )
        );

    }

    try {

        await command.execute(
            interaction,
            client
        );

    } catch (error) {

        await handleInteractionError(
            interaction,
            error,
            withTraceContext(
                {
                    type: "context_menu",
                    commandName: interaction.commandName
                },
                interactionTraceContext
            )
        );

    }

}