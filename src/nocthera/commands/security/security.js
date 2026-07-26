import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} from 'discord.js';

export default {
  category: 'Security',
  data: new SlashCommandBuilder()
    .setName('security')
    .setDescription('Nocthera security & captcha settings')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((sub) =>
      sub
        .setName('status')
        .setDescription('Show security module status'),
    )
    .addSubcommand((sub) =>
      sub
        .setName('captcha')
        .setDescription('Toggle captcha verification')
        .addBooleanOption((o) =>
          o.setName('enabled').setDescription('Enable captcha').setRequired(true),
        ),
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor(0x5865f2).setTimestamp();

    if (sub === 'status') {
      embed
        .setTitle('Nocthera Security')
        .setDescription(
          [
            '**Modules**',
            '• Verification — active',
            '• Captcha — available',
            '• Role panels — active',
            '• Tickets — active',
          ].join('\n'),
        )
        .setFooter({ text: 'Nocthera Security' });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (sub === 'captcha') {
      const enabled = interaction.options.getBoolean('enabled');
      try {
        const { getGuildConfig, setGuildConfig } = await import(
          '../../../services/config/guildConfig.js'
        );
        const config = await getGuildConfig(interaction.client, interaction.guildId);
        config.captchaEnabled = enabled;
        await setGuildConfig(interaction.client, interaction.guildId, config);
      } catch {
        /* optional */
      }
      embed
        .setTitle('Captcha Updated')
        .setDescription(`Captcha verification is now **${enabled ? 'enabled' : 'disabled'}**.`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
