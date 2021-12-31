const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelID } = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Anonymously report someone for their actions')
        .addStringOption(option => option.setName('Report').setDescription('Report someone or an action, please be descriptive').setRequired(true)),
	async execute(client, interaction) {
		await interaction.reply({ content: 'Your report has been sent to staff, thanks for reporting!', ephemeral: true }); // Sends the message but as an ephemeral one
        const reportMessage = interaction.options.getString('Report'); // Gets the message from a string option with the name of 'Report'
        client.channels.cache.get(ChannelID).send(reportMessage);
	},
};