const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "total-bans",
    category: "extra",
    aliases: ['bans'],
    description: "Check ban info.",
    usage: 'a.total-bans / a.bans',
    run: async (client, message, args) => {

        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} `)
        })
    }
}