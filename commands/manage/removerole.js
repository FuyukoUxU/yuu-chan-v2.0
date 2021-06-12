const { Message } = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'removerole',
    category: "manage",
    aliases: ['rmrole'],
    description: "Gỡ role của 1 người. Yêu cầu role bot cao hơn role cần gỡ",
    usage: '_removerole / _rmrole [@username @role name]',
    run : async(client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Bạn không có quyền gỡ role.')
        const target = message.mentions.members.first() 
        if(!target) return message.channel.send('Chưa mention member nhé')
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('Role không hợp lệ')
        await target.roles.remove(role)
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
             const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));
        const embed = new MessageEmbed()
        .setTitle(`Tên role: ${roleName.name}`)
        .setDescription(`${message.author} đã gỡ role ${roleName} thành công cho ${member.user}`)
        .setColor('f3f3f3')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(new Date().toLocaleString())

   return message.channel.send(embed);
    }
}