const { 
    AttachmentBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

const generateImage = require('../utils/welcomeImage');

module.exports = (client) => {

    client.on('messageCreate', async (message) => {

        if (message.author.bot) return;

        // 🔐 OWNER ONLY CHECK
        if (message.author.id !== process.env.OWNER_ID) return;

        // =========================
        // COMMAND 1: !!welcome
        // =========================
        if (message.content.trim().startsWith('!!welcome')) {

            let target = message.mentions.members.first() || message.member;

            const image = await generateImage(target);

            const attachment = new AttachmentBuilder(image, {
                name: 'welcome.png'
            });

            return message.channel.send({
                content: `✨ Welcome ${target}!`,
                files: [attachment]
            });
        }

        // =========================
        // COMMAND 2: !!sendmessage_
        // =========================
        if (message.content.startsWith('!!sendmessage_')) {

            const text = message.content.replace('!!sendmessage_', '');

            if (!text.trim()) {
                return message.reply("Kamu belum menulis pesannya.");
            }

            return message.channel.send(text);
        }

        // =========================
        // COMMAND 3: !!roles
        // =========================
        if (message.content === '!!roles') {

            const embed = new EmbedBuilder()
                .setTitle("🎮 Gaming Roles")
                .setDescription("Pilih game favorit kamu di bawah ini!")
                .setColor("#5865F2");

            const menu = new StringSelectMenuBuilder()
                .setCustomId('role_select')
                .setPlaceholder('Klik untuk memilih role...')
                .setMinValues(1)
                .setMaxValues(5)
                .addOptions([
                    {
                        label: 'RPG',
                        description: 'Role Playing Games',
                        value: 'RPG'
                    },
                    {
                        label: 'FPS',
                        description: 'First Person Shooter',
                        value: 'FPS'
                    },
                    {
                        label: 'Battleground Shooters',
                        description: 'PUBG, Apex, dll',
                        value: 'Battleground Shooters'
                    },
                    {
                        label: 'Roblox',
                        description: 'Semua tentang Roblox',
                        value: 'Roblox'
                    },
                    {
                        label: 'HoYoverse',
                        description: 'Genshin, HSR, dll',
                        value: 'HoYoverse'
                    }
                ]);

            const row = new ActionRowBuilder().addComponents(menu);

            return message.channel.send({
                embeds: [embed],
                components: [row]
            });
        }

    });

};
