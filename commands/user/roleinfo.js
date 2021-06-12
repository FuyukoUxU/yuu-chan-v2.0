const { MessageEmbed, Permissions } = require('discord.js');
const stringSimilarity = require('string-similarity');

module.exports = {
    name: "roleinfo",
    category: "User",
    description: "Trả về thông tên role",
    usage: '_roleinfo [Tên role]',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Vui lòng nhập ID của role hoặc tên của role!');
        let role = await message.guild.roles.fetch(args[0]);
        if (!role) {
            const roles = message.guild.roles.cache.filter(r => r.managed === false).map(g => g.name);
            const search = args.join(' ');
            const matches = stringSimilarity.findBestMatch(search, roles);
            const find = matches.bestMatch.target;
            role = message.guild.roles.cache.find(el => el.name === find);
        }
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        try {
            const role = message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString()))
            console.log(role)
            const perms = new Permissions(role.permissions.bitfield).toArray()
        const membersWithRole = role.members;
        const embed = new MessageEmbed()
            .setColor(role.color)
            .setTitle("Roleinfo")
            .addField("ID: ", role.id)
            .addField("Tên role: ", role.name, true)
            .addField("Số lượng:", membersWithRole.size, true)
            .addField("Vị trí: ", role.position, true)
            .addField("Tag được? ", role.mentionable ? "Có" : "Không", true)
            .addField("Hiển thị? ", role.hoist ? "Có" : "Không", true)
            .addField("Màu: ", role.hexColor, true)
            .addField("Quyền role:", perms.join(', '), true);
        message.channel.send(embed);
        } catch (e) {
            return message.channel.send('Không có role này').then(() => console.log(e))
        }
    },
};