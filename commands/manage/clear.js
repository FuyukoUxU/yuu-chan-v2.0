const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "clear",
    category: "manage",
    description: "Xóa tin nhắn.",
    usage: '_clear [số tin nhắn cần xóa , lớn hơn 0 và nhỏ hon 100]',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
            return message.channel.send(
                `Bạn không có quyền xóa tin nhắn, ${message.author.username}` // returns this message to user with no perms
            );
        if (!args[0]) {
            return message.channel.send(`Bạn chưa nhập số tin nhắn cần xóa`)
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`Xóa thành công ${deleteAmount}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#f2f2f2')
        await message.channel.send(embed)
    }
}