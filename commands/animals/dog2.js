const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'dog2',
    category: "animals",
    description: "Ảnh con cờ hó v2 :>",
    run: async(client, message, args) => {
      var superagent = require('superagent');
  
      var lo = new Discord.MessageEmbed()
                  .setDescription(`Vui lòng chờ ...`)
                  .setTimestamp()
  
      message.channel.send(lo).then(m => {
  
      superagent.get(`https://nekos.life/api/v2/img/woof`)
        .end((err, response) => {
          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`** [Ảnh random con chó](${response.body.url})**`)
              .setTimestamp()
              .setImage(response.body.url)
          m.edit(embed_nsfw);
      })
    })
  }
} 