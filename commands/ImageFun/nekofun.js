const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'nekofun',
    category: "ImageFun",
    aliases: ['nk2'],
    description: "A beautyful neko",
    usage: '_nekofun / _nk2',
    run: async(client, message, args) => {
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/neko')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("__Neko__")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}