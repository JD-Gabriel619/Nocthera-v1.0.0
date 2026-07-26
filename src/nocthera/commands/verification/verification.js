import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    EmbedBuilder
} from "discord.js";

import {
    PanelStorage
} from "../../panels/panelStorage.js";

export default {

    category: "Verification",

    data: new SlashCommandBuilder()

        .setName("verification")

        .setDescription("Configure Nocthera verification")

        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageGuild
        )

        .addSubcommand(sub =>
            sub

                .setName("setup")

                .setDescription("Create a verification configuration")

                .addRoleOption(option =>
                    option

                        .setName("verified_role")

                        .setDescription("Role given after verification")

                        .setRequired(true)
                )

                .addChannelOption(option =>
                    option

                        .setName("channel")

                        .setDescription("Verification channel")

                        .addChannelTypes(ChannelType.GuildText)

                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub

                .setName("panel")

                .setDescription("Attach verification to a panel")

                .addStringOption(option =>
                    option

                        .setName("panel")

                        .setDescription("Panel ID")

                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub

                .setName("disable")

                .setDescription("Disable verification")
        ),

    async execute(interaction) {

        const sub =
            interaction.options.getSubcommand();

        if (sub === "setup") {

            const role =
                interaction.options.getRole(
                    "verified_role"
                );

            const channel =
                interaction.options.getChannel(
                    "channel"
                );

            interaction.client.verification ??= new Map();

            interaction.client.verification.set(

                interaction.guild.id,

                {

                    roleId: role.id,

                    channelId: channel.id

                }

            );

            const embed =
                new EmbedBuilder()

                    .setColor(0x57F287)

                    .setTitle("Verification Configured")

                    .addFields(

                        {

                            name: "Verified Role",

                            value: role.toString(),

                            inline: true

                        },

                        {

                            name: "Channel",

                            value: channel.toString(),

                            inline: true

                        }

                    );

            return interaction.reply({

                embeds: [embed]

            });

        }

        if (sub === "panel") {

            const panelId =
                interaction.options.getString(
                    "panel"
                );

            const panel =
                await PanelStorage.get(

                    interaction.guild.id,

                    panelId

                );

            if (!panel) {

                return interaction.reply({

                    content:
                        "❌ Panel not found.",

                    ephemeral: true

                });

            }

            panel.type = "verification";

            await PanelStorage.save(panel);

            return interaction.reply({

                content:
                    `✅ **${panelId}** is now a Verification Panel.`

            });

        }

        if (sub === "disable") {

            interaction.client.verification?.delete(

                interaction.guild.id

            );

            return interaction.reply({

                content:
                    "✅ Verification disabled."

            });

        }

    }

};