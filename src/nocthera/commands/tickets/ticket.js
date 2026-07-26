import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
} from 'discord.js';

export default {
  category: 'Ticket',
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Nocthera ticket system')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addSubcommand((sub) =>
      sub
        .setName('setup')
        .setDescription('Configure ticket category and staff role')
        .addChannelOption((o) =>
          o
            .setName('category')
            .setDescription('Category for ticket channels')
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true),
        )
        .addRoleOption((o) =>
          o.setName('staff_role').setDescription('Staff role for tickets').setRequired(true),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('panel')
        .setDescription('Post a ticket open panel')
        .addChannelOption((o) =>
          o
            .setName('channel')
            .setDescription('Channel to post the panel')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true),
        )
        .addStringOption((o) =>
          o.setName('title').setDescription('Panel title').setRequired(false),
        )
        .addStringOption((o) =>
          o.setName('description').setDescription('Panel description').setRequired(false),
        ),
    )
    .addSubcommand((sub) =>
      sub.setName('close').setDescription('Close the current ticket channel'),
    )
    .addSubcommand((sub) =>
      sub
        .setName('add')
        .setDescription('Add a user to this ticket')
        .addUserOption((o) =>
          o.setName('user').setDescription('User to add').setRequired(true),
        ),
    )
    .addSubcommand((sub) =>
      sub
        .setName('remove')
        .setDescription('Remove a user from this ticket')
        .addUserOption((o) =>
          o.setName('user').setDescription('User to remove').setRequired(true),
        ),
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor(0x5865f2).setTimestamp();

    if (sub === 'setup') {
      const category = interaction.options.getChannel('category');
      const staffRole = interaction.options.getRole('staff_role');
      // Persist via guild config if available
      try {
        const { getGuildConfig, setGuildConfig } = await import('../../../services/config/guildConfig.js');
        const config = await getGuildConfig(interaction.client, interaction.guildId);
        config.ticketCategoryId = category.id;
        config.ticketStaffRoleId = staffRole.id;
        await setGuildConfig(interaction.client, interaction.guildId, config);
      } catch {
        /* optional persistence */
      }
      embed
        .setTitle('Ticket Setup')
        .setDescription(`Category: ${category}\nStaff role: ${staffRole}`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (sub === 'panel') {
      const channel = interaction.options.getChannel('channel');
      const title = interaction.options.getString('title') || 'Support Tickets';
      const description =
        interaction.options.getString('description') ||
        'Click the button below to open a support ticket.';
      const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = await import('discord.js');
      const panelEmbed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle(title)
        .setDescription(description)
        .setFooter({ text: 'Nocthera Tickets' });
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('nocthera:ticket:open')
          .setLabel('Open Ticket')
          .setStyle(ButtonStyle.Primary),
      );
      await channel.send({ embeds: [panelEmbed], components: [row] });
      embed.setTitle('Panel Posted').setDescription(`Ticket panel sent to ${channel}`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (sub === 'close') {
      if (!interaction.channel?.name?.includes('ticket')) {
        return interaction.reply({
          content: 'This command must be used inside a ticket channel.',
          ephemeral: true,
        });
      }
      embed.setTitle('Ticket Closed').setDescription('This channel will be deleted in 5 seconds.');
      await interaction.reply({ embeds: [embed] });
      setTimeout(() => interaction.channel.delete().catch(() => {}), 5000);
      return;
    }

    if (sub === 'add' || sub === 'remove') {
      const user = interaction.options.getUser('user');
      if (!interaction.channel) {
        return interaction.reply({ content: 'No channel context.', ephemeral: true });
      }
      if (sub === 'add') {
        await interaction.channel.permissionOverwrites.edit(user.id, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
        });
        embed.setTitle('User Added').setDescription(`${user} can now access this ticket.`);
      } else {
        await interaction.channel.permissionOverwrites.delete(user.id);
        embed.setTitle('User Removed').setDescription(`${user} was removed from this ticket.`);
      }
      return interaction.reply({ embeds: [embed] });
    }
  },
};
