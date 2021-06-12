const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "pika",
    category: "ImageFun",
    description: "See a pikachu",
    usage: '_pika',
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/pikachu";
        //const facts = "https://some-random-api.ml/facts/birb"

        let image, response;
 
        try {
            response = await axios.get(url);
            image = response.data;
        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Pikapika`)
            .setDescription(`⚡ pikachuuu ╰(*°▽°*)╯ ⚡`)
            .setColor("RANDOM")
            .setImage(image.link)
            .setURL(image.link)
            .setFooter(`Bot by Shirakami Yuu`);    

        await message.channel.send(embed)
    }
}