var clock = require('date-events')();
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => { //startup
console.log(`Logged in as ${client.user.tag}!`);
client.user.setActivity('ravencoinlite.org');
});

client.on('guildMemberAdd', member => { //join message
   const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
   if (!channel) return;
       channel.send(`${member} Welcome to the RavencoinLite community server! Please make sure to check out ${rules}, ${info}, and ${announcements} to stay up to date!`);
});

client.on('guildMemberRemove', member => { //leave message
   const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
   if (!channel) return;
       channel.send(`${member.user.username} Has left the server :cry:`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('pong!');
  } else if (commandName === 'members') {
  	await interaction.reply(`member count: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`your tag: ${interaction.user.tag}\nyour id: ${interaction.user.id}`);
	}
});

client.login(token);
