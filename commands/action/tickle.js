const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'tickle',
    category: "action",
    description: "Hmmm ... haha ❤",
    usage: '_tickle <@user>',
    run: async(client, message, args) => {
      if (!args[0]) return message.channel.send("Sử dụng không chính xác, cần thêm <username>").then(m => m.delete({ timeout: 5000 }))
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/tickle')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("Haha... 🤣😂🤣")
                .setDescription(`*${message.author} đã chọc ${member.user}* 😆`)
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}