const { Client, Message, MessageEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
    name: "calc",
    category: "extra",
    description: "Bot tính toán",
    info: "Căn bậc 2 sử dụng sqrt(), đổi đơn vị (cm to inch), v.v",
    usage: '_calc [Phép tính]',
    run: async (client, message, args) => {
        if (!args.join(" ")) return message.reply(`Chưa có phép tính nào !`);
        try {
            message.channel.send(
                new MessageEmbed()
                .setTitle("Yuu-chan tính toán")
                .setDescription("Developer by ShirakamiYuu#5382")
                .setColor("RANDOM")
                .addField('Phép tính', args.join(" "))
                .addField('Đáp án', math.evaluate(args.join(" ")))
            )
        } catch (err) {
            return message.reply(`Mình không giải được :( | Vì lỗi này : \`${err.message}\` Aiko#1782 fix nhanh nhé !`);
        }
    },
};