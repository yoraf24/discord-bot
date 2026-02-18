require('dotenv').config();
const ALLOWED_CHANNEL_ID = "1217065750703898686";
const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

client.once('clientReady', () => {
  console.log('Bot AI (Gratis) siap!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Cuma balas di channel tertentu
  if (message.channel.id !== ALLOWED_CHANNEL_ID) return;


  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Kamu adalah bot Discord bernama Vana yang santai, gaul, ramah, dan humoris serta tidak kaku."
        },
        {
          role: "user",
          content: message.content
        }
      ],
    });

    const reply = completion.choices[0].message.content;
    message.reply(reply);

  } catch (error) {
    console.error(error);
    message.reply("AI sedang error 😭");
  }
});

client.login(process.env.DISCORD_TOKEN);
