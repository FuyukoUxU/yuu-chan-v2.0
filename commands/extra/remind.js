const { MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "remind",
    category: "extra",
    description: "Đặt lời nhắc",
    usage: "_reminder [thời gian] (5s,15m,1h,2d) [lời nhắc]",
    run: async (client, message, args) => {
        const reminderTime = args[0];
        if (!reminderTime) return message.reply("Vui lòng nhập thời gian.");
        const reminder = args.slice(1).join(" ") || `Lời nhắc của ${message.author.username}`;
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Nhắc nhở của ${message.author.username} đặt thành công`)
            .addField("Nội dung: ", `${reminder}`)
            .addField("Thời gian", `${reminderTime}`)
            .setTimestamp();
        message.channel.send(embed);

        setTimeout(async function() {
                embed.setColor("RANDOM")
                    .setTitle(`Thông báo của ${message.author.username}`)
                    .setTimestamp();
            await message.channel.send(message.author, { embed: embed });
        }, ms(reminderTime));
    },
};