import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  category: 'Utility',
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Show a user avatar')
    .addUserOption((o) =>
      o.setName('user').setDescription('User').setRequired(false),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const url = user.displayAvatarURL({ size: 512, extension: 'png' });
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(`${user.username}'s Avatar`)
      .setImage(url)
      .setFooter({ text: 'Nocthera Utility' });
    return interaction.reply({ embeds: [embed] });
  },
};
