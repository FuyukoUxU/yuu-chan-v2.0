const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    category: "fun",
    aliases: ['mm'],
    description: "Get meme.",
    usage: '_meme / _mm',
    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/meme';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`Đã xảy ra lỗi, hãy thử lại!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Meme: `)
            .setDescription(data.caption)
            .setColor('#f3f3f3')
            .setImage(data.image)

        await message.channel.send(embed)
    }
}