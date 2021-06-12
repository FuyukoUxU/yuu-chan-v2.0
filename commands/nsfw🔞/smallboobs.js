const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'smallboobs',
    category: "nsfw🔞",
    description: "Loli cho nhanh :) `Lệnh đang lỗi , khi nào fix xong sẽ dùng được ngay`",
    usage: "_smallboobs",
    run: async(client, message, args) => {
      var superagent = require('superagent');
      if (!message.channel.nsfw) {
        return message.channel.send('Bạn phải sử dụng lệnh này trong phòng chờ nsfw!');
      }
  
      var lo = new Discord.MessageEmbed()
                  .setDescription(`Vui lòng chờ ...`)
                  .setTimestamp()
  
      message.channel.send(lo).then(m => {
  
      superagent.get(`https://nekos.life/api/v2/img/smallboobs`)
        .end((err, response) => {
          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`:underage:\n** [Không tải được ảnh? Nhấp vào đây](${response.body.url})**`)
              .setTimestamp()
              .setImage(response.body.url)
              .setFooter(`Bot by Shirakami Yuu`)
          m.edit(embed_nsfw);
      })
    })
  }
} 