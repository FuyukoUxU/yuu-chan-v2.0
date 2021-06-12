const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "binary",
    category: "extra",
    aliases: ['bin'],
    description: "Chuyển đổi văn bản thành 101010.",
    usage: '_binary / _bin [text]',
    run: async (client, message, args) => {
        const url = `http://some-random-api.ml/binary?text=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`Đã có lỗi xảy ra. Xin vui lòng thử lại!`)
        }

        const embed = new MessageEmbed()
            .setTitle('Văn bản thành số nhị phân')
            .setDescription(data.binary)

        await message.channel.send(embed)
    }
}