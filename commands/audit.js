const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('audit')
        .setDescription('Display audit logs')
        .addUserOption(option => option.setName('target').setDescription('The user you want to test for audit permissions')),
  async execute(interaction) {

    const user = interaction.options.getMember('target');
    const isAdmin = interaction.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog);

    if (user) {
      const isUserAdmin = user.permissions.has(PermissionsBitField.Flags.ViewAuditLog);

      if (isUserAdmin) { return interaction.reply({ content: `${user.user.username} can view audit logs`, ephemeral: true }); }
      else { return interaction.reply({ content: `${user.user.username} does not have permission to do this.`, ephemeral: true }); }
    }

    if (isAdmin) {
      interaction.reply({ content: 'You can view audit logs', ephemeral: true });
    }
    else { interaction.reply({ content: 'You do not have permission to do this.', ephemeral: true }); }
  },
};