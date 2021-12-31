const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
	new SlashCommandBuilder()
        .setName('report')
        .setDescription('Anonymously report someone for their actions')
        .addStringOption(option => option.setName('report').setDescription('Report someone or something').setRequired(true)),
];