module.exports = (client) => {

    client.on('interactionCreate', async (interaction) => {

        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId !== 'role_select') return;

        const roleName = interaction.values[0];

        const role = interaction.guild.roles.cache.find(r => r.name === roleName);

        if (!role) {
            return interaction.reply({ content: "Role tidak ditemukan.", ephemeral: true });
        }

        const member = interaction.member;

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            return interaction.reply({ content: `Role ${roleName} dihapus!`, ephemeral: true });
        } else {
            await member.roles.add(role);
            return interaction.reply({ content: `Role ${roleName} ditambahkan!`, ephemeral: true });
        }

    });

};
