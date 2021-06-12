const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'wink',
    category: "action",
    description: "Hmmm ... nháy mắt thôi mà ❤",
    usage: '_wink <@user>',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("Sử dụng không chính xác, cần thêm <username>").then(m => m.delete({ timeout: 5000 }))
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const url = "https://some-random-api.ml/animu/wink";

        let image, response;
 
        try {
            response = await axios.get(url);
            image = response.data;
        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
        .setTitle("Kawaii 😋")
        .setDescription(`*${message.author} đã nháy mắt với ${member.user}* 😆`)
        .setImage(image.link)
        .setColor('RANDOM')
        .setURL(image.link)
        .setFooter(`Bot by Shirakami Yuu`);


        await message.channel.send(embed)
    }
}