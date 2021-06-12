const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'goose',
    category: "animals",
    description: "Ảnh con ngỗng :>",
    usage: '_goose',
    run: async(client, message, args) => {
      var superagent = require('superagent');
  
      var lo = new Discord.MessageEmbed()
                  .setDescription(`Vui lòng chờ ...`)
                  .setTimestamp()
  
      message.channel.send(lo).then(m => {
  
      superagent.get(`https://nekos.life/api/v2/img/goose`)
        .end((err, response) => {
          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`** [Ảnh random con ngỗng](${response.body.url})**`)
              .setTimestamp()
              .setImage(response.body.url)
          m.edit(embed_nsfw);
      })
    })
  }
} 