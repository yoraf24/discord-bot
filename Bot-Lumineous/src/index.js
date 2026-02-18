require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Lumineous aktif sebagai ${client.user.tag}`);
});

// Load semua event
require('./events/welcomeJoin')(client);
require('./events/message')(client);
require('./events/interaction')(client);


client.login(process.env.TOKEN);
