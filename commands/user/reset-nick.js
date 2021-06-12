const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset-nick",
  description: 'Reset nick name trong server',
    usage: '_reset-nick [@user]',
    category: 'User',
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Tag @user vào trước");

    try {
      member.setNickname(null);
      message.reply("Reset nickname cho " + member.toString() + " thành công !")
    } catch (err) {
      message.reply(
        "Quyền của " + member.toString() + " cao hơn ! Không thể reset nickname !"
      );
    }
  },
};