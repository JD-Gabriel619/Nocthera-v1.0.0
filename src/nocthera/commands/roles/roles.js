import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export default {
  category: 'Roles',
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Nocthera role panel system')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand((sub) =>
      sub
        .setName('panel')
        .setDescription('Post a button role panel')
        .addChannelOption((o) =>
          o
            .setName('channel')
            .setDescription('Channel to post in')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true),
        )
        .addRoleOption((o) =>
          o.setName('role').setDescription('Role to grant').setRequired(true),
        )
        .addStringOption((o) =>
          o.setName('label').setDescription('Button label').setRequired(false),
        )
        .addStringOption((o) =>
          o.setName('title').setDescription('Panel title').setRequired(false),
        )
        .addStringOption((o) =>
          o.setName('description').setDescription('Panel description').setRequired(false),
        ),
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    if (sub !== 'panel') return;

    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');
    const label = interaction.options.getString('label') || role.name;
    const title = interaction.options.getString('title') || 'Role Panel';
    const description =
      interaction.options.getString('description') ||
      `Click the button to toggle **${role.name}**.`;

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(title)
      .setDescription(description)
      .setFooter({ text: 'Nocthera Roles' });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`nocthera:role:toggle:${role.id}`)
        .setLabel(label)
        .setStyle(ButtonStyle.Primary),
    );

    await channel.send({ embeds: [embed], components: [row] });
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(0x57f287)
          .setTitle('Role Panel Posted')
          .setDescription(`Panel for ${role} sent to ${channel}`),
      ],
      ephemeral: true,
    });
  },
};
