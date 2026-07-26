import {
    SlashCommandBuilder,
    EmbedBuilder
} from "discord.js";

export default {

    data: new SlashCommandBuilder()

        .setName("ping")

        .setDescription(
            "Display Nocthera latency information."
        ),

    category: "Core",

    async execute(interaction) {

        const gatewayPing =
            Math.round(
                interaction.client.ws.ping
            );

        const apiLatency =
            Date.now() -
            interaction.createdTimestamp;

        const embed =
            new EmbedBuilder()

                .setColor(0x5865F2)

                .setTitle("🏓 Nocthera Pong!")

                .addFields(

                    {
                        name: "Gateway",

                        value: `${gatewayPing} ms`,

                        inline: true
                    },

                    {
                        name: "API",

                        value: `${apiLatency} ms`,

                        inline: true
                    },

                    {
                        name: "Status",

                        value: "🟢 Online",

                        inline: true
                    }

                )

                .setFooter({

                    text: "Nocthera • Version 1.0.0"

                })

                .setTimestamp();

        await interaction.reply({

            embeds: [embed],

            ephemeral: false

        });

    }

};