const { AttachmentBuilder } = require('discord.js');
const generateImage = require('../utils/welcomeImage');

module.exports = (client) => {

    client.on('guildMemberAdd', async (member) => {

        const channel = member.guild.channels.cache.find(
            ch => ch.name === 'welcome'
        );

        if (!channel) return;

        const image = await generateImage(member);

        const attachment = new AttachmentBuilder(image, {
            name: 'welcome.png'
        });

        channel.send({
            content: `✨ Selamat datang ${member}!`,
            files: [attachment]
        });

    });

};
