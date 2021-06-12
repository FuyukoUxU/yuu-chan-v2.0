const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const superfetch = require('node-superfetch');
module.exports = {
    name: 'yuri',
    category: "nsfw🔞",
    description: "Hmmm ... 🔞",
    usage: '_yuri',
    run: async(client, message, args) => {
       var superagent = require('superagent');
       if (!message.channel.nsfw) return message.channel.send('Channel này không được sử dụng. Hãy đến nsfw channel và thử lại ❗') 
       var lo = new Discord.MessageEmbed()
            superfetch.get('https://nekos.life/api/v2/img/yuri')
            .end((err, response) => {
              const embed = new MessageEmbed()
                .setTitle("__Yuri__")
                .setImage(response.body.url)
                .setColor('RANDOM')
                .setURL(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`);
              message.channel.send({ embed });
        });
    }
}