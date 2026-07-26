import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  category: 'Utility',
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Show information about a user')
    .addUserOption((o) =>
      o.setName('user').setDescription('User to inspect').setRequired(false),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild
      ? await interaction.guild.members.fetch(user.id).catch(() => null)
      : null;

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'ID', value: user.id, inline: true },
        { name: 'Bot', value: user.bot ? 'Yes' : 'No', inline: true },
        {
          name: 'Account Created',
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
      )
      .setFooter({ text: 'Nocthera Utility' })
      .setTimestamp();

    if (member) {
      embed.addFields(
        {
          name: 'Joined Server',
          value: member.joinedTimestamp
            ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
            : 'Unknown',
          inline: true,
        },
        {
          name: 'Roles',
          value:
            member.roles.cache
              .filter((r) => r.id !== interaction.guild.id)
              .map((r) => r.toString())
              .slice(0, 15)
              .join(' ') || 'None',
          inline: false,
        },
      );
    }

    return interaction.reply({ embeds: [embed] });
  },
};
