const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'foxfun',
    category: "ImageFun",
    description: "Cáo girl nhé !",
    usage: '_foxfun',
    run: async(client, message, args) => {
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/fox_girl')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("__Fun__")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}