const { User } = require("./User.js");
var db = require('quick.db');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);
const token = config.token;
const prefix = '>';

for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
}

client.once('ready', () => {
        console.log('Kidingnyan is Ready!');
});

client.on('interactionCreate', async interaction => {});
client.on('messageCreate', function(message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args[2].shift().toLowerCase();

        console.log(args);

        if (command === 'ping') {
                const timeTaken = Date.now() - message.createdTimestamp;
                message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        }
});
client.on('message', message => {
        if (client.message === '>hello') {
                message.reply('Hello!');
        }
});
//로그인
client.login(token);