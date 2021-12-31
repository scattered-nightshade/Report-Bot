const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
        new SlashCommandBuilder()
        .setName('report')
        .setDescription('Anonymously report someone for their actions')
        .addStringOption(option => option.setName('Report').setDescription('Report someone or an action, please be descriptive').setRequired(true)),
];