const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'hug',
    category: "action",
    description: "Hmmm ... xoa đầu người (nào đó) ❤",
    usage: '_hug <@user>',
    run: async(client, message, args) => {
      if (!args[0]) return message.channel.send("Sử dụng không chính xác, cần thêm <username>").then(m => m.delete({ timeout: 5000 }))
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/hug')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("Hmm, xoa đầu nè 😋")
                .setDescription(`*${message.author} đã xoa đầu ${member.user}* 😆`)
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}