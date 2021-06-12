const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kick",
    category: "manage",
    description: "Kick 1 user khỏi server. Yêu cầu role bot cao hơn role người cần kick",
    usage: '_kick [@username]',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(`Bạn không có quyền kick người dùng`)
        }
        if (!args[0]) {
            return message.channel.send(`Bạn chưa tag tên user!`)
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        try {
            await member.kick();
            await message.channel.send(`${member} đã bị kick thành công`)
        } catch (e) {
            return message.channel.send(`Người dùng đó không ở trong server này`)
        }

    }
}