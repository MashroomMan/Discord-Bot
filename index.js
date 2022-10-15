// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();

// Constructs a path to the commands directory and stores it in a constant to reference it later
const commandsPath = path.join(__dirname, 'commands');
const eventsPath   = path.join(__dirname, 'events');

// fs.readdirSync method returns an array of all the file names in the directory e.g. ['ping.js', 'beep.js']. Array.filter is used to filter for .js files
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventFiles    = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));


// With that array we loop over it to dynamically set your commands to the client.commands Collection
for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    // When the client is ready, run this code (only once)
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    // console.log(event.name, (...args) => event.execute(...args));
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login to Discord with your client's token
client.login(token);
