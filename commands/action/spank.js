const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'spank',
    category: "action",
    description: "Vỗ mông ai đó (BDSM) - Yêu cầu phải vào #NSFW Channel để dùng",
    usage: '_spank <@user>',
    run: async(client, message, args) => {
      if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
      if (!message.channel.nsfw) return message.channel.send('Bạn phải sử dụng lệnh này trong phòng chờ nsfw!') 
      if (!args[0]) return message.channel.send("Tag @user nhé !").then(m => m.delete({ timeout: 5000 }))
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (message.author === member.user)  return message.channel.send("Ờ ... mông bạn có đau không ... :) :)").then(m => m.delete({ timeout: 5000 }))
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/spank')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
                .setDescription(`*${message.author} đang vỗ mông ${member.user}*`)
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}