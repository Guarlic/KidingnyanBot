const { User } = require("./User.js");
var db = require('quick.db');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [ // Intent를 설정합니다. 설정하지 않으면 CLIENT_MISSING_INTENTS 오류가 발생합니다.
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES 
] });
client.commands = new Collection();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let config = require('./config.json')
const token = config.token;
const prefix = '>'

//커맨드 로딩
for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
}

client.once('ready', () => {
        console.log('Kidingnyan is Ready!');
});

client.on("messageCreate", async msg => {
    // message 작성자가 봇이면 그냥 return
    if (msg.author.bot) return;
    // message 시작이 prefix가 아니면 return
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandtext = args.shift().toLowerCase();

    console.log(`L37 ${args}`)

    const command = client.commands.get(commandtext);

    //없으면 리턴
    if (!command) return;

    //디버깅
    console.log(`${msg.member.user.username}#${msg.member.user.discriminator} Messaged \"${msg.content}\"`)

    //execute
    await command.execute(client, msg);
});

//로그인
client.login(token);