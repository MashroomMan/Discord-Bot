const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1024827374266744952'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

// for global commands
/*
rest.delete(Routes.applicationCommand(clientId, 'commandId'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);
*/