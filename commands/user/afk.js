const db = require('quick.db')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name : 'afk',
    category: 'user',
    description: 'Dùng để thông báo bạn để afk',
    usage: '_afk [ Lí do ]',
    run : async(client, message, args) => {
        const content = args.join(" ")
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
            .setDescription(`Bạn đã bật chế độ afk\n**Reason :** ${content}`)
            .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true}))
        message.channel.send(embed)
    }
}