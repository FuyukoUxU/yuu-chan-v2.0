const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'smug',
    category: "action",
    description: "Test rồi sẽ biết",
    usage: '_smug <@user>',
    run: async(client, message, args) => {
      if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/smug')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setAuthor(message.author.username + " đang cảm thấy mình vjp pro :)")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}