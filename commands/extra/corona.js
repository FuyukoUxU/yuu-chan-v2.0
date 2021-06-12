const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "corona",
    category: "extra",
    description: "Thông tin dịch corona.",
    usage: '_corona',
    run: async (client, message, args) => {
        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** không tồn tại hoặc dữ liệu không được thu thập`)
        }

        const embed = new MessageEmbed()
            .setTitle(args[0] ? `${args[0].toUpperCase()} Thống kê`: 'Tổng số trường hợp Corona trên toàn thế giới')
            .setColor('#fb644c')
            .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
            .addFields(
                {
                    name: 'Số trường hợp:',
                    value: corona.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Số người chết:',
                    value: corona.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Được cứu sống',
                    value: corona.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Ca nhiễm (hiện tại):',
                    value: corona.active.toLocaleString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Trường hợp nghiêm trọng:',
                    value: corona.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Được cứu hôm nay:',
                    value: corona.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: 'Số người chết hôm nay:',
                    value: corona.todayDeaths.toLocaleString(),
                    inline: true
                })

        await message.channel.send(embed)
    }
};