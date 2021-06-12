const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'cat2',
    category: "animals",
    description: "Ảnh con mèo v2",
    usage: '_cat2',
    run: async(client, message, args) => {
      var superagent = require('superagent');
  
      var lo = new Discord.MessageEmbed()
                  .setDescription(`Vui lòng chờ ...`)
                  .setTimestamp()
  
      message.channel.send(lo).then(m => {
  
      superagent.get(`https://nekos.life/api/v2/img/meow`)
        .end((err, response) => {
          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`** [Ảnh random con mèo ](${response.body.url})**`)
              .setTimestamp()
              .setImage(response.body.url)
          m.edit(embed_nsfw);
      })
    })
  }
} 