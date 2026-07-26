import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} from 'discord.js';

export default {
  category: 'Moderation',
  data: new SlashCommandBuilder()
    .setName('mod')
    .setDescription('Nocthera moderation tools')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand((sub) =>
      sub
        .setName('warn')
        .setDescription('Warn a member')
        .addUserOption((o) => o.setName('user').setDescription('User').setRequired(true))
        .addStringOption((o) => o.setName('reason').setDescription('Reason').setRequired(false)),
    )
    .addSubcommand((sub) =>
      sub
        .setName('timeout')
        .setDescription('Timeout a member')
        .addUserOption((o) => o.setName('user').setDescription('User').setRequired(true))
        .addIntegerOption((o) =>
          o
            .setName('minutes')
            .setDescription('Duration in minutes')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(40320),
        )
        .addStringOption((o) => o.setName('reason').setDescription('Reason').setRequired(false)),
    )
    .addSubcommand((sub) =>
      sub
        .setName('kick')
        .setDescription('Kick a member')
        .addUserOption((o) => o.setName('user').setDescription('User').setRequired(true))
        .addStringOption((o) => o.setName('reason').setDescription('Reason').setRequired(false)),
    )
    .addSubcommand((sub) =>
      sub
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption((o) => o.setName('user').setDescription('User').setRequired(true))
        .addStringOption((o) => o.setName('reason').setDescription('Reason').setRequired(false))
        .addIntegerOption((o) =>
          o
            .setName('delete_days')
            .setDescription('Delete message history (days)')
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(7),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('unban')
        .setDescription('Unban a user')
        .addStringOption((o) =>
          o.setName('user_id').setDescription('User ID to unban').setRequired(true),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('purge')
        .setDescription('Delete recent messages')
        .addIntegerOption((o) =>
          o
            .setName('amount')
            .setDescription('Number of messages (1-100)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100),
        ),
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const embed = new EmbedBuilder().setColor(0xed4245).setTimestamp();

    if (sub === 'purge') {
      const amount = interaction.options.getInteger('amount');
      await interaction.deferReply({ ephemeral: true });
      const deleted = await interaction.channel.bulkDelete(amount, true);
      embed
        .setColor(0x57f287)
        .setTitle('Messages Purged')
        .setDescription(`Deleted **${deleted.size}** message(s).`);
      return interaction.editReply({ embeds: [embed] });
    }

    if (sub === 'unban') {
      const userId = interaction.options.getString('user_id');
      await interaction.guild.members.unban(userId, reason);
      embed.setColor(0x57f287).setTitle('User Unbanned').setDescription(`ID: \`${userId}\``);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (sub === 'warn') {
      embed
        .setTitle('Member Warned')
        .setDescription(`**User:** ${user}\n**Reason:** ${reason}\n**Moderator:** ${interaction.user}`);
      try {
        await user.send({ embeds: [embed] }).catch(() => {});
      } catch {
        /* ignore DM fail */
      }
      return interaction.reply({ embeds: [embed] });
    }

    if (!member) {
      return interaction.reply({ content: 'Member not found in this server.', ephemeral: true });
    }

    if (sub === 'timeout') {
      const minutes = interaction.options.getInteger('minutes');
      await member.timeout(minutes * 60 * 1000, reason);
      embed
        .setTitle('Member Timed Out')
        .setDescription(`**User:** ${user}\n**Duration:** ${minutes}m\n**Reason:** ${reason}`);
      return interaction.reply({ embeds: [embed] });
    }

    if (sub === 'kick') {
      await member.kick(reason);
      embed.setTitle('Member Kicked').setDescription(`**User:** ${user}\n**Reason:** ${reason}`);
      return interaction.reply({ embeds: [embed] });
    }

    if (sub === 'ban') {
      const deleteDays = interaction.options.getInteger('delete_days') ?? 0;
      await interaction.guild.members.ban(user.id, { reason, deleteMessageSeconds: deleteDays * 86400 });
      embed.setTitle('Member Banned').setDescription(`**User:** ${user}\n**Reason:** ${reason}`);
      return interaction.reply({ embeds: [embed] });
    }
  },
};
