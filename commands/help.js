const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of bot commands'),
  async execute(interaction) {
    console.log(interaction);
    const user = interaction.user;

    user.send('Hi');
  },
};