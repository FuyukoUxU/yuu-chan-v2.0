const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: "weather",
    category: "extra",
    aliases: ['tt'],
    description: "Xác định thời tiết tại 1 địa điểm xác định.",
    usage: '_weather / _tt [Thành phố] | Không có dấu tiếng việt nhé !',
    run: async (client, message, args) => {

        let api_key = "95027301472d561f9df36fc012d55140"

        var wea = (args.slice(0).join(" "));
        if(!args.slice(0).join(" ")) {
            return message.channel.send(`Điền tên thành phố vào nhé ! :map:`)
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${wea}&units=imperial&appid=${api_key}`;

        let response, city;

        try {
            response = await axios.get(url);
            city = response.data
            console.log(city)
        } catch (e) {
            return message.channel.send(`Không tìm thấy thành phố này`)
        }

        var tempf = city.main.temp;

        let doMathtempC = (tempf - 32) / 1.8

        let deg = city.wind.deg

        const embed = new MessageEmbed()
            .setTitle(`Thời tiết tại: ${city.name}`)
            .setThumbnail(`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`)
            .setColor('RANDOM')
            .setDescription(`Thông tin thời tiết cập nhật trong khoảng 1 giờ`)
            .setTimestamp()
            .setFooter(`Bot by Shirakami Yuu`)
            .addFields(
                {
                    name: "Vị trí",
                    value: `${city.sys.country}`,
                    inline: "true"
                },
                {
                    name: "Trạng thái hiện tại",
                    value: `${city.weather[0].description}`,
                    inline: "true"
                },
                {
                    name: "Nhiệt độ hiện tại: ",
                    value: `${city.main.temp} °F | ${doMathtempC} °C`,
                    inline: true
                },
                {
                    name: "Vận tốc gió: ",
                    value: `${city.wind.speed} m/s`,
                    inline: true
                },
                {
                    name: "Áp suất:",
                    value: `${city.main.pressure} hPa`,
                    inline: true
                },
                {
                    name: "Độ ẩm:",
                    value: `${city.main.humidity} %`,
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}