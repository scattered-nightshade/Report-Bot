const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');

require('dotenv').config();

const { CLIENT_ID, GUILD_ID } = require('./config.json');

const commands = require('./interactionCommands.js'); // Gets all of the commands created in ./interactionCommands.js
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js')); // Creates a filter where it only acknowledges files that end with ".js"

for (const file of commandFiles) { // Loops through all of the commands inside of the selected folder
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


// I honestly dont know how to explain this shit, this might help "https://en.wikipedia.org/wiki/Representational_state_transfer"
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);