import { EmbedBuilder, MessageFlags } from 'discord.js';
import { toggleRole } from '../services/roleToggleService.js';
import { InteractionHelper } from '../utils/interactionHelper.js';
import { handleInteractionError } from '../utils/errorHandler.js';

export async function handleRoleToggleButton(interaction, client, args = []) {
    try {
        const roleId = args[0];

        if (!roleId) {
            throw new Error('Missing role ID.');
        }

        const result = await toggleRole(interaction, roleId);

        const successEmbed = new EmbedBuilder()
            .setColor(result.action === 'added' ? 0x57F287 : 0xED4245)
            .setTitle(
                result.action === 'added'
                    ? '✅ Role Added'
                    : '🗑️ Role Removed'
            )
            .setDescription(
                result.action === 'added'
                    ? `You received **${result.role.name}**.`
                    : `Removed **${result.role.name}**.`
            )
            .setTimestamp();

        await InteractionHelper.safeReply(interaction, {
            embeds: [successEmbed],
            flags: MessageFlags.Ephemeral
        });

    } catch (error) {
        await handleInteractionError(interaction, error, {
            source: 'roleToggleButtons'
        });
    }
}