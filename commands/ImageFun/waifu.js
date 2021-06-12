const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'waifu',
    category: "ImageFun",
    aliases: ['wfu'],
    description: "Hmmm ... Hãy xem",
    usage: '_waifu / _wfu',
    run: async(client, message, args) => {
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/waifu')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("__ワイフ__")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}