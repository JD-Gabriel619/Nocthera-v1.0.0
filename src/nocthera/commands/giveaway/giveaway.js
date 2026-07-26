import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
} from 'discord.js';

export default {
  category: 'Giveaway',
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Nocthera giveaway system')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((sub) =>
      sub
        .setName('start')
        .setDescription('Start a giveaway')
        .addStringOption((o) =>
          o.setName('prize').setDescription('Prize').setRequired(true),
        )
        .addIntegerOption((o) =>
          o
            .setName('duration')
            .setDescription('Duration in minutes')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(10080),
        )
        .addIntegerOption((o) =>
          o
            .setName('winners')
            .setDescription('Number of winners')
            .setRequired(false)
            .setMinValue(1)
            .setMaxValue(20),
        )
        .addChannelOption((o) =>
          o
            .setName('channel')
            .setDescription('Channel to post in')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(false),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('end')
        .setDescription('End a giveaway early')
        .addStringOption((o) =>
          o.setName('message_id').setDescription('Giveaway message ID').setRequired(true),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('reroll')
        .setDescription('Reroll winners')
        .addStringOption((o) =>
          o.setName('message_id').setDescription('Giveaway message ID').setRequired(true),
        ),
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor(0x57f287).setTimestamp();

    if (sub === 'start') {
      const prize = interaction.options.getString('prize');
      const duration = interaction.options.getInteger('duration');
      const winners = interaction.options.getInteger('winners') || 1;
      const channel =
        interaction.options.getChannel('channel') || interaction.channel;
      const endsAt = Date.now() + duration * 60 * 1000;

      const gEmbed = new EmbedBuilder()
        .setColor(0x57f287)
        .setTitle('🎉 Giveaway')
        .setDescription(
          `**Prize:** ${prize}\n**Winners:** ${winners}\n**Ends:** <t:${Math.floor(endsAt / 1000)}:R>`,
        )
        .setFooter({ text: 'React with 🎉 to enter • Nocthera' });

      const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = await import('discord.js');
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('nocthera:giveaway:enter')
          .setLabel('Enter')
          .setEmoji('🎉')
          .setStyle(ButtonStyle.Success),
      );

      const msg = await channel.send({ embeds: [gEmbed], components: [row] });
      try {
        const { createGiveaway } = await import('../../../services/giveawayService.js');
        await createGiveaway(interaction.client, {
          guildId: interaction.guildId,
          channelId: channel.id,
          messageId: msg.id,
          prize,
          winners,
          endsAt,
          hostId: interaction.user.id,
        });
      } catch {
        /* service optional */
      }

      embed.setTitle('Giveaway Started').setDescription(`Posted in ${channel}\nPrize: **${prize}**`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (sub === 'end' || sub === 'reroll') {
      const messageId = interaction.options.getString('message_id');
      try {
        const svc = await import('../../../services/giveawayService.js');
        if (sub === 'end' && svc.endGiveaway) {
          await svc.endGiveaway(interaction.client, interaction.guildId, messageId);
        } else if (sub === 'reroll' && svc.rerollGiveaway) {
          await svc.rerollGiveaway(interaction.client, interaction.guildId, messageId);
        }
        embed.setTitle(sub === 'end' ? 'Giveaway Ended' : 'Giveaway Rerolled')
          .setDescription(`Message ID: \`${messageId}\``);
      } catch (error) {
        embed.setColor(0xed4245).setTitle('Error').setDescription(error.message || 'Giveaway action failed.');
      }
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
