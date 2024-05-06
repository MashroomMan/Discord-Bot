const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

async function checkUserExists(userId) {
  const query = 'SELECT 1 FROM users WHERE id = $1';
  const res = await db.query(query, [userId]);
  const rowCount = res.rowCount;
  if (rowCount == 1) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Bet on a team')
        .addStringOption(option => option.setName('team').setDescription('The team you want to bet on').setRequired(true))
        .addNumberOption(option => option.setName('amount').setDescription('The amount of money you want to bet').setRequired(true)),
  async execute(interaction) {

    const userId = interaction.user.id;
    const userExists = await checkUserExists(userId);

    if (!userExists) {
      const userInsert = 'INSERT INTO users (id, username, balance) VALUES ($1, $2, $3)';
      const username = interaction.user.username;
      const balance = 100;

      await db.query(userInsert, [userId, username, balance]);
    }

    const team = interaction.options.getString('team');
    const amount = interaction.options.getNumber('amount');

    const teamQuery = 'SELECT * FROM teams WHERE LOWER(name) LIKE LOWER($1)';
    const teamResult = await db.query(teamQuery, [`%${team}%`]);
    const teamId = teamResult.rows.at(0)['id'];
    const rowCount = teamResult.rowCount;

    const userQuery = 'SELECT balance FROM users WHERE id = $1';
    const userResult = await db.query(userQuery, [userId]);
    const balance = userResult.rows.at(0)['balance'];
    if (rowCount == 1 && amount > 0 && amount <= balance) {

      // insert a new row in the bet table
      try {
        const betInsert = 'INSERT INTO bet (user_id, team_id, bet) VALUES ($1, $2, $3)';
        await db.query(betInsert, [userId, teamId, amount]);
      }
      catch (error) {
        await interaction.reply('You already bet on this team.');
        return;
      }

      const newUserBalance = balance - amount;

      // update balance - subtract amount from balance and update database
      const userUpdateQuery = 'UPDATE users SET balance = $1 WHERE id = $2';
      await db.query(userUpdateQuery, [newUserBalance, userId]);

    }
    else {
      await interaction.reply('Invalid request.');
      return;
    }

    await interaction.reply('Done!');
  },
};