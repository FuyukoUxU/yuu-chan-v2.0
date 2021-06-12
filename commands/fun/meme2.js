const got = require('got')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "meme2",
    category: "fun",
    aliases: ['mm2'],
    description: "Cũng là meme nhưng là bản 2",
    usage: '_meme2 / _mm2',
    run : async(client, message) => {
        got('https://www.reddit.com/r/memes/random/.json').then(res => {
            let content = JSON.parse(res.body)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(content[0].data.children[0].data.title)
                    .setImage(content[0].data.children[0].data.url)
                    .setColor("RANDOM")
                    .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
            )
        })
    }
}