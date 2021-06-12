const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "koala",
    category: "animals",
    description: "Xem ảnh koala...",
    usage: '_koala',
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/koala";
 

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