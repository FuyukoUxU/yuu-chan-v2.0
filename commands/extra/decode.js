const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "decode",
    category: "extra",
    aliases: ['dec'],
    description: "Chuyển mã nhị phân 101010 thành chữ.",
    usage: 'a.decode / a.dec [binary]',
    run: async (client, message, args) => {
        const url = `http://some-random-api.ml/binary?decode=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`Có lỗi xảy ra, vui lòng thử lại!`)
        }

        const embed = new MessageEmbed()
            .setTitle('Decode Binary')
            .setDescription(data.text)

        await message.channel.send(embed)
    }
}