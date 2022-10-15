const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display user profile')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
  async execute(interaction) {
    // await interaction.reply({ content: 'Help is on the way!', ephemeral: true });

    const user = interaction.options.getUser('target');

    if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
  },
};