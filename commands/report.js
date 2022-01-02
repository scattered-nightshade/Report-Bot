const { SlashCommandBuilder } = require('@discordjs/builders');
const { ReportChanelID } = require('../config.json');
module.exports = {
	name: 'report',
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Anonymously report someone for their actions')
		.addStringOption(option => option.setName('report').setDescription('Report someone or something').setRequired(true)),
	async execute(client, interaction) {
        const reportMessage = interaction.options.getString('report'); // Gets the message from a string option with the name of 'Report'
		interaction.guild.channels.cache.find(channelReports => channelReports.id === ReportChanelID).send({ content: `**New report:** ${reportMessage}` });
		await interaction.reply({ content: 'Your report has been sent to staff, thanks for reporting!', ephemeral: true }); // Sends the message but as an ephemeral one
	},
};