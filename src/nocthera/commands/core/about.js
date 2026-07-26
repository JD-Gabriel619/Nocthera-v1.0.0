import {
    SlashCommandBuilder,
    EmbedBuilder,
    version as discordVersion
} from "discord.js";

import os from "os";
import process from "process";
import pkg from "../../../../package.json" with { type: "json" };

function formatUptime(seconds) {

    const days = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    const parts = [];

    if (days)
        parts.push(`${days}d`);

    if (hours)
        parts.push(`${hours}h`);

    if (minutes)
        parts.push(`${minutes}m`);

    parts.push(`${Math.floor(seconds)}s`);

    return parts.join(" ");

}

export default {

    data: new SlashCommandBuilder()

        .setName("about")

        .setDescription(
            "View information about Nocthera."
        ),

    category: "Core",

    async execute(interaction) {

        const client =
            interaction.client;

        const uptime =
            formatUptime(
                process.uptime()
            );

        const memory =
            (
                process.memoryUsage().heapUsed /
                1024 /
                1024
            ).toFixed(2);

        const embed =
            new EmbedBuilder()

                .setColor(0x5865F2)

                .setTitle("🌙 Nocthera")

                .setDescription(
                    "A modern Discord management framework built for performance, security, and modularity."
                )

                .addFields(

                    {
                        name: "Version",
                        value: pkg.version,
                        inline: true
                    },

                    {
                        name: "Node.js",
                        value: process.version,
                        inline: true
                    },

                    {
                        name: "Discord.js",
                        value: discordVersion,
                        inline: true
                    },

                    {
                        name: "Servers",
                        value: `${client.guilds.cache.size}`,
                        inline: true
                    },

                    {
                        name: "Users",
                        value: `${client.users.cache.size}`,
                        inline: true
                    },

                    {
                        name: "Commands",
                        value: `${client.commands.size}`,
                        inline: true
                    },

                    {
                        name: "Memory Usage",
                        value: `${memory} MB`,
                        inline: true
                    },

                    {
                        name: "Uptime",
                        value: uptime,
                        inline: true
                    },

                    {
                        name: "Platform",
                        value: `${os.type()} ${os.release()}`,
                        inline: true
                    }

                )

                .setFooter({

                    text: "Nocthera Framework • Version 1.0.0"

                })

                .setTimestamp();

        await interaction.reply({

            embeds: [embed]

        });

    }

};