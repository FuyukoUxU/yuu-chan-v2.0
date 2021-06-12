const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addrole',
    category: "manage",
    description: "Thêm role cho @user . Yêu cầu role bot cao hơn role cần add",
    usage: '_addrole [@username @rolename]',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`Bạn không có quyền quản lí role`).then(m => m.delete({ timeout: 5000 }));

        if (!args[0] || !args[1]) return message.channel.send("Câu lệnh sai. Nhập a.h addrole để xem hướng dẫn").then(m => m.delete({ timeout: 5000 }))

        try {

             const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
             const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

             const alreadyHasRole = member._roles.includes(roleName.id);

             if (alreadyHasRole) return message.channel.send('@User đó đã có role này').then(m => m.delete({ timeout: 5000 }));

             const embed = new MessageEmbed()
                 .setTitle(`Role Name: ${roleName.name}`)
                 .setDescription(`${message.author} đã thêm role ${roleName} thành công cho ${member.user}`)
                 .setColor('f3f3f3')
                 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                 .setFooter(new Date().toLocaleString())

            return member.roles.add(roleName).then(() => message.channel.send(embed));
        } catch (e) {
            return message.channel.send('Oh...Có thể role bạn add cao hơn role bot hoặc bot không thể add role này').then(m => m.delete({ timeout: 5000 })).then(() => console.log(e))
        }
    }
}
