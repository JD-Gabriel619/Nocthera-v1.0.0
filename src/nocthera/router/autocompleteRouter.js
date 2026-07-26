import { logger } from "../../utils/logger.js";

export async function routeAutocomplete(
    interaction,
    client
) {

    const command =
        client.commands.get(interaction.commandName);

    if (command?.autocomplete) {

        try {

            await command.autocomplete(
                interaction,
                client
            );

        } catch (error) {

            logger.error(
                "Autocomplete failed",
                {
                    error: error.message,
                    command: interaction.commandName,
                    guildId: interaction.guildId
                }
            );

            await interaction.respond([])
                .catch(() => {});

        }

        return;

    }

    const focused =
        interaction.options.getFocused(true);

    switch (interaction.commandName) {

        case "apply": {

            if (focused.name !== "application")
                return;

            const { getApplicationRoles } =
                await import("../../utils/database.js");

            const roles =
                await getApplicationRoles(
                    client,
                    interaction.guildId
                );

            const search =
                interaction.options.getString(
                    "application",
                    false
                ) ?? "";

            return interaction.respond(

                roles
                    .filter(role =>
                        role.enabled !== false &&
                        role.name
                            .toLowerCase()
                            .startsWith(
                                search.toLowerCase()
                            )
                    )
                    .slice(0, 25)
                    .map(role => ({
                        name: role.name,
                        value: role.name
                    }))

            );

        }

        case "app-admin": {

            if (focused.name !== "application")
                return;

            const { getApplicationRoles } =
                await import("../../utils/database.js");

            const roles =
                await getApplicationRoles(
                    client,
                    interaction.guildId
                );

            const search =
                interaction.options.getString(
                    "application",
                    false
                ) ?? "";

            return interaction.respond(

                roles
                    .filter(role =>
                        role.name
                            .toLowerCase()
                            .startsWith(
                                search.toLowerCase()
                            )
                    )
                    .slice(0, 25)
                    .map(role => ({
                        name: role.name,
                        value: role.name
                    }))

            );

        }

        case "reactroles": {

            if (focused.name !== "panel")
                return;

            const {
                getAllReactionRoleMessages,
                deleteReactionRoleMessage
            } =
                await import(
                    "../../services/reactionRoleService.js"
                );

            const guild =
                interaction.guild;

            let panels =
                await getAllReactionRoleMessages(
                    client,
                    interaction.guildId
                );

            const results = [];

            for (const panel of panels) {

                const channel =
                    guild.channels.cache.get(
                        panel.channelId
                    );

                if (!channel) {

                    await deleteReactionRoleMessage(
                        client,
                        interaction.guildId,
                        panel.messageId
                    ).catch(() => {});

                    continue;

                }

                const message =
                    await channel.messages
                        .fetch(panel.messageId)
                        .catch(() => null);

                if (!message)
                    continue;

                results.push({

                    name:
                        `${message.embeds[0]?.title ?? "Panel"} (${channel.name})`
                            .substring(0, 100),

                    value:
                        panel.messageId

                });

            }

            return interaction.respond(
                results.slice(0, 25)
            );

        }

    }

}