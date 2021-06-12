const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'wallpaper',
    category: "ImageFun",
    aliases: ['wall'],
    description: "Wallpaper đẹp",
    usage: '_wallpaper / _wall',
    run: async(client, message, args) => {
       var superagent = require('superagent');
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/wallpaper')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("__Wallpaper__")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}