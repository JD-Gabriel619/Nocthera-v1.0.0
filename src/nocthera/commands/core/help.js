import {
    SlashCommandBuilder,
    EmbedBuilder
} from "discord.js";

export default {

    data: new SlashCommandBuilder()

        .setName("help")

        .setDescription(
            "View every available Nocthera command."
        ),

    category: "Core",

    async execute(interaction) {

        const registry =
            interaction.client.commandRegistry;

        const commands =
            registry
                ? registry.values()
                : [];

        const categories =
            new Map();

        for (const command of commands) {

            const category =
                command.category ??
                "Other";

            if (!categories.has(category)) {

                categories.set(
                    category,
                    []
                );

            }

            categories
                .get(category)
                .push(
                    `• \`/${command.data.name}\``
                );

        }

        const embed =
            new EmbedBuilder()

                .setColor(0x5865F2)

                .setTitle(
                    "📚 Nocthera Help"
                )

                .setDescription(
                    "Below are all currently loaded Nocthera commands."
                )

                .setFooter({

                    text:
                        `Nocthera • ${commands.length} Commands Loaded`

                })

                .setTimestamp();

        if (categories.size === 0) {

            embed.addFields({

                name: "Commands",

                value:
                    "No commands are currently loaded."

            });

        } else {

            for (const [category, list] of categories) {

                embed.addFields({

                    name: category,

                    value: list.join("\n")

                });

            }

        }

        await interaction.reply({

            embeds: [embed]

        });

    }

};