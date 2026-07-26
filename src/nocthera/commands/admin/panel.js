import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

import { PanelStorage } from "../../panels/panelStorage.js";

export default {

    category: "Administration",

    data: new SlashCommandBuilder()

        .setName("panel")

        .setDescription("Manage Nocthera panels")

        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageGuild
        )

        .addSubcommand(sub =>
            sub
                .setName("create")
                .setDescription("Create a new panel")

                .addStringOption(option =>
                    option
                        .setName("id")
                        .setDescription("Unique panel ID")
                        .setRequired(true)
                )

                .addStringOption(option =>
                    option
                        .setName("title")
                        .setDescription("Panel title")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("list")
                .setDescription("View every panel")
        )

        .addSubcommand(sub =>
            sub
                .setName("delete")
                .setDescription("Delete a panel")

                .addStringOption(option =>
                    option
                        .setName("id")
                        .setDescription("Panel ID")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("preview")
                .setDescription("Preview a panel")

                .addStringOption(option =>
                    option
                        .setName("id")
                        .setDescription("Panel ID")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("publish")
                .setDescription("Publish a panel")

                .addStringOption(option =>
                    option
                        .setName("id")
                        .setDescription("Panel ID")
                        .setRequired(true)
                )

                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Destination channel")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        const sub =
            interaction.options.getSubcommand();

        switch (sub) {

            case "create":

                return createPanel(interaction);

            case "list":

                return listPanels(interaction);

            case "delete":

                return deletePanel(interaction);

            case "preview":

                return previewPanel(interaction);

            case "publish":

                return publishPanel(interaction);

        }

    }

};

async function createPanel(interaction) {

    const panelId =
        interaction.options.getString("id");

    const title =
        interaction.options.getString("title");

    if (
        await PanelStorage.exists(
            interaction.guild.id,
            panelId
        )
    ) {

        return interaction.reply({

            content:
                "❌ Panel already exists.",

            ephemeral: true

        });

    }

    await PanelStorage.save({

        guildId: interaction.guild.id,

        panelId,

        title,

        description: "Edit this panel using future builder commands.",

        color: "#5865F2",

        type: "default",

        embeds: [],

        buttons: [],

        selectMenus: [],

        modals: []

    });

    return interaction.reply({

        content:
            `✅ Panel **${panelId}** created.`

    });

}

async function listPanels(interaction) {

    const panels =
        await PanelStorage.getGuildPanels(
            interaction.guild.id
        );

    const embed =
        new EmbedBuilder()

            .setColor("#5865F2")

            .setTitle("Nocthera Panels")

            .setDescription(

                panels.length

                    ? panels

                        .map(panel =>

                            `• **${panel.panelId}**`

                        )

                        .join("\n")

                    : "No panels created."

            );

    return interaction.reply({

        embeds: [embed]

    });

}

async function deletePanel(interaction) {

    const id =
        interaction.options.getString("id");

    await PanelStorage.delete(

        interaction.guild.id,

        id

    );

    return interaction.reply({

        content:
            `🗑️ Deleted **${id}**.`

    });

}

async function previewPanel(interaction) {

    return interaction.reply({

        content:
            "🚧 Panel Preview Builder coming next.",

        ephemeral: true

    });

}

async function publishPanel(interaction) {

    return interaction.reply({

        content:
            "🚧 Panel Publisher coming next.",

        ephemeral: true

    });

}