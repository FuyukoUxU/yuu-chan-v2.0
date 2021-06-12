const Discord = require("discord.js");
module.exports = {
    name: 'hkitsune',
    category: "nsfw🔞",
    aliases: ['hksn'],
    description: "Press away and you will know 🔞",
    usage: '_hkitsune / _hksn',
    run: async(client, message, args) => {
    var superagent = require('superagent');
    if (!message.channel.nsfw) return message.channel.send('Channel này không được sử dụng. Hãy đến nsfw channel và thử lại ❗') 
    var lo = new Discord.MessageEmbed()
                .setDescription(`Đang lấy hình ảnh, vui lòng đợi. . .`)
                .setTimestamp()
    message.channel.send(lo).then(m => {

        superagent.get('https://nekobot.xyz/api/image').query({ type: 'hkitsune'}).end((err, response) => {

            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`:underage:\n**[Hình ảnh không tải? Bấm vào đây 🌏](${response.body.message})**`)
                .setTimestamp()
                .setImage(response.body.message)
                .setFooter(`Bot by Shirakami Yuu`);
            m.edit(embed_nsfw);
        });
    });
}}
