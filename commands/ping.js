const { MessageEmbed } = require('discord.js');

module.exports = {
	name:"ping",
	async execute(client, msg, User, db, mongoose, DBConnect) {
        const Embed = new MessageEmbed()
        .setColor('#CB7ACF')
        .setTitle(':ping_pong:\u0020\u0020Ping! Pong! ')
        .setAuthor('KidingNyang', 'https://cdn.discordapp.com/attachments/940231585242963978/940605290829733888/7c6bd920fd801904.jpeg')
        .setDescription(`Ping : ${client.ws.ping}ms`)
        .addFields(
            { name: 'Requested by', value: `${msg.member.user.username}, ${msg.member.user.id}` }
        )
        .setTimestamp()
        .setFooter('KidingNyang', 'https://cdn.discordapp.com/attachments/940231585242963978/940605290829733888/7c6bd920fd801904.jpeg');
		await msg.reply({ embeds : [Embed]});
	},
};