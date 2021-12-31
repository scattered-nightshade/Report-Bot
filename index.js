const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS ] });

require('dotenv').config();
const { readdirSync } = require('fs');
const { BotToken } = require('./config.json');

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js')); // Creates a filter where it only acknowledges files that end with ".js"
client.commands = new Collection(); // Creates a collection containing all of the commands in ./commands/
for (const file of commandFiles) { // Loops through all of the commands inside of the selected folder
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.id} is now ready`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

const DiscordBotToken = process.env.DISCORD_BOT_TOKEN || BotToken; // It first attempts to get the bot token from a .env or enviromental variables (as you should probably put them in there), if not it will then try to find the bot token in ./config.json which is admittedly much less secure
client.login(DiscordBotToken);
