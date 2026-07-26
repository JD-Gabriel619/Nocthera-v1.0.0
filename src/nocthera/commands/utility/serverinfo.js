import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  category: 'Utility',
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Show information about this server'),

  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) {
      return interaction.reply({ content: 'Guild only.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ size: 256 }))
      .addFields(
        { name: 'ID', value: guild.id, inline: true },
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Members', value: String(guild.memberCount), inline: true },
        {
          name: 'Created',
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        { name: 'Channels', value: String(guild.channels.cache.size), inline: true },
        { name: 'Roles', value: String(guild.roles.cache.size), inline: true },
      )
      .setFooter({ text: 'Nocthera Utility' })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
