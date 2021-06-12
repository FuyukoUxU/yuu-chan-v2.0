const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cat",
    category: "animals",
    description: "Xem ảnh mèo...",
    usage: '_cat',
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/cat";

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;


        } catch (e) {
            return message.channel.send(`Đã có lỗi xảy ra. Xin vui lòng thử lại!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Ảnh nè :>>`)
            .setColor(`#f3f3f3`)
            .setImage(image.link)

        await message.channel.send(embed)
    }
}