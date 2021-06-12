const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnick",
  description: 'Đặt nick name trong server',
    usage: '_setnick [@user] [Nickname]',
    category: 'User',
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Tag @user vào trước!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Chưa thêm nickname / Nickname không hợp lệ!");

    try {
      member.setNickname(arguments);
      message.reply("Đặt nickname cho " + member.toString() + " thành công !")
    } catch (err) {
      console.log(err);
      message.reply(
        "Quyền của " + member.toString() + " cao hơn ! Không thể set nickname !"
      );
    }
  },
};