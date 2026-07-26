import { logger } from "../../utils/logger.js";
import { getGuildConfig } from "../../services/config/guildConfig.js";
import {
    getBotMessage,
    isBotOwner,
    isCommandCategoryEnabled,
    isMaintenanceMode
} from "../../config/bot.js";
import botConfig from "../../config/bot.js";

import {
    handleInteractionError,
    createError,
    ErrorTypes
} from "../../utils/errorHandler.js";

import { validateChatInputPayloadOrThrow } from "../../utils/commandInputValidation.js";
import {
    enforceAbuseProtection,
    formatCooldownDuration
} from "../../utils/abuseProtection.js";

import { isCommandEnabled } from "../../services/commandAccessService.js";
import { resolveSlashAccessKey } from "../../utils/messageAdapter.js";
import { enforceDefaultCommandPermissions } from "../../utils/permissionGuard.js";

const COMMAND_ERROR_SUBTYPES = {
    warn: "warn_failed",
    kick: "kick_failed",
    ban: "ban_failed",
    unban: "unban_failed",
    timeout: "timeout_failed",
    untimeout: "untimeout_failed",
    warnings: "warnings_view_failed",
    ticket: "ticket_failed",
    serverstats: "serverstats_failed",
    gcreate: "giveaway_failed",
    gend: "giveaway_failed",
    gdelete: "giveaway_failed",
    greroll: "giveaway_failed"
};

export async function routeCommand(
    interaction,
    client,
    interactionTraceContext,
    withTraceContext
) {

    try {

        logger.info(
            `Command executed: /${interaction.commandName} by ${interaction.user.tag}`
        );

        validateChatInputPayloadOrThrow(
            interaction,
            withTraceContext(
                {
                    type: "command_input_validation",
                    commandName: interaction.commandName
                },
                interactionTraceContext
            )
        );

        const command =
            client.commands.get(interaction.commandName);

        if (!command) {

            throw createError(
                `No command matching ${interaction.commandName}`,
                ErrorTypes.CONFIGURATION,
                "Command not found.",
                withTraceContext(
                    {
                        commandName: interaction.commandName
                    },
                    interactionTraceContext
                )
            );

        }

        if (
            isMaintenanceMode() &&
            !isBotOwner(interaction.user.id)
        ) {

            throw createError(
                "Maintenance mode",
                ErrorTypes.CONFIGURATION,
                getBotMessage("maintenanceMode")
            );

        }

        if (
            !isCommandCategoryEnabled(command.category)
        ) {

            throw createError(
                "Category disabled",
                ErrorTypes.CONFIGURATION,
                getBotMessage("commandDisabled")
            );

        }

        const cooldown =
            Number(botConfig.commands?.defaultCooldown) || 0;

        if (
            cooldown > 0 &&
            !isBotOwner(interaction.user.id)
        ) {

            const key =
                `${interaction.user.id}:${interaction.commandName}`;

            const expires =
                client.cooldowns.get(key);

            if (
                expires &&
                Date.now() < expires
            ) {

                throw createError(
                    "Cooldown",
                    ErrorTypes.RATE_LIMIT,
                    getBotMessage(
                        "cooldownActive",
                        {
                            time: `${Math.ceil((expires - Date.now()) / 1000)}s`
                        }
                    )
                );

            }

            client.cooldowns.set(
                key,
                Date.now() + cooldown * 1000
            );

        }

        const abuse =
            await enforceAbuseProtection(
                interaction,
                command,
                interaction.commandName
            );

        if (!abuse.allowed) {

            throw createError(
                "Abuse Protection",
                ErrorTypes.RATE_LIMIT,
                `Please wait ${formatCooldownDuration(abuse.remainingMs)}`
            );

        }

        let guildConfig = null;

        if (interaction.guild) {

            guildConfig =
                await getGuildConfig(
                    client,
                    interaction.guild.id,
                    interactionTraceContext
                );

            const accessKey =
                resolveSlashAccessKey(interaction);

            const enabled =
                await isCommandEnabled(
                    client,
                    interaction.guild.id,
                    accessKey,
                    command.category
                );

            if (!enabled) {

                throw createError(
                    "Disabled",
                    ErrorTypes.CONFIGURATION,
                    "This command has been disabled."
                );

            }

        }

        const allowed =
            await enforceDefaultCommandPermissions(
                interaction,
                command,
                {
                    source: "interactionCreate",
                    guildConfig
                }
            );

        if (!allowed)
            return;

        await command.execute(
            interaction,
            guildConfig,
            client
        );

    } catch (error) {

        await handleInteractionError(
            interaction,
            error,
            withTraceContext(
                {
                    type: "command",
                    commandName: interaction.commandName,
                    subtype:
                        COMMAND_ERROR_SUBTYPES[
                            interaction.commandName
                        ]
                },
                interactionTraceContext
            )
        );

    }

}