import {
    SlashCommandBuilder,
    EmbedBuilder
} from "discord.js";

import os from "os";
import process from "process";

function formatDuration(seconds) {

    const days = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${days}d ${hours}h ${minutes}m ${Math.floor(seconds)}s`;

}

export default {

    data: new SlashCommandBuilder()

        .setName("stats")

        .setDescription(
            "Display Nocthera system statistics."
        ),

    category: "Core",

    async execute(interaction) {

        const client = interaction.client;

        const memory = process.memoryUsage();

        const embed = new EmbedBuilder()

            .setColor(0x5865F2)

            .setTitle("📊 Nocthera Statistics")

            .addFields(

                {
                    name: "🏓 Gateway Ping",
                    value: `${Math.round(client.ws.ping)} ms`,
                    inline: true
                },

                {
                    name: "⏱ Uptime",
                    value: formatDuration(process.uptime()),
                    inline: true
                },

                {
                    name: "⚡ Node.js",
                    value: process.version,
                    inline: true
                },

                {
                    name: "🖥 Servers",
                    value: `${client.guilds.cache.size}`,
                    inline: true
                },

                {
                    name: "👥 Users",
                    value: `${client.users.cache.size}`,
                    inline: true
                },

                {
                    name: "💬 Channels",
                    value: `${client.channels.cache.size}`,
                    inline: true
                },

                {
                    name: "📦 Commands",
                    value: `${client.commands.size}`,
                    inline: true
                },

                {
                    name: "🧠 Heap Used",
                    value: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
                    inline: true
                },

                {
                    name: "📚 Heap Total",
                    value: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
                    inline: true
                },

                {
                    name: "💾 RSS",
                    value: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
                    inline: true
                },

                {
                    name: "🖥 CPU",
                    value: `${os.cpus().length} Cores`,
                    inline: true
                },

                {
                    name: "💿 Platform",
                    value: `${os.platform()} ${os.arch()}`,
                    inline: true
                }

            )

            .setFooter({

                text: "Nocthera Framework • System Monitor"

            })

            .setTimestamp();

        await interaction.reply({

            embeds: [embed]

        });

    }

};