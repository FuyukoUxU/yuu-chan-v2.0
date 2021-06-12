const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    category: "manage",
    description: "Ban 1 @user. Yêu cầu bot phải có role cao hơn @user, người chạy lệnh phải có quyền ban !",
    usage: '_ban [@user / user ID]',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`Bạn không có quyền ban user`)
        }
        if (!args[0]) {
            return message.channel.send(`Nhập user cần ban`)
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        try {
            await member.ban();
            await message.channel.send(`${member} đã bị ban`)
        } catch (e) {
            return message.channel.send(`@User không có trong server này!`)
        }

    }
}