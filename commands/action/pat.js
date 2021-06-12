const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'pat',
    category: "action",
    description: "Hmmm ... vỗ nhẹ người (nào đó) ❤",
    usage: '_pat <@user>',
    run: async(client, message, args) => {
      if (!args[0]) return message.channel.send("Sử dụng không chính xác, cần thêm <username>").then(m => m.delete({ timeout: 5000 }))
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/pat')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("Hmm , vỗ nhẹ cái nào ~ 😋")
                .setDescription(`*${message.author} đã vỗ nhẹ ${member.user}* 😆`)
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}