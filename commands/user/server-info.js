const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server-info",
    category: "User",
    aliases: ['svif'],
    description: "Check server info.",
    usage: '_server-info / _svif',
    run: async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "brazil":
                region = ':flag_br: Brazil';
                break;
            case "europe":
                region = ':flag_eu: Europe';
                break;
            case "hongkong":
                region = ':flag_hk: Hong Kong';
                break;
            case "india":
                region = ':flag_in: India';
                break;
            case "japan":
                region = ':flag_jp: Japan';
                break;
            case "russia":
                region = ':flag_ru: Russia';
                break;
            case "singapore":
                region = ':flag_sg: Singapore';
                break;
            case "southafrica":
                region = ':flag_za: South Africa';
                break;
            case "sydney":
                region = ':flag_au: Sydney';
                break;
            case "us-east":
                region = ':flag_us: Us-East'
                break;
            case "us-west":
                region = ':flag_us: Us-West';
                break;
            case "us-south":
                region = ':flag_us: Us-South'
                break;
            case "us-central":
                region = ':flag_us: Us-Central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name} server stats`)
            .addFields(
                {
                    name: "Owner: ",
                    value: `${message.guild.owner.user.tag}`,
                    inline: true
                },
                {
                    name: "Members: ",
                    value: `Có ${message.guild.memberCount} thành viên!`,
                    inline: true
                },
                {
                    name: "Thành viên Online: ",
                    value: `Có ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} thành viên đang online!`,
                    inline: true
                },
                {
                    name: "Số bot: ",
                    value: `Có ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "Ngày thành lập server: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Số lượng roles: ",
                    value: `Có ${message.guild.roles.cache.size} roles trong server.`,
                    inline: true,
                },
                {
                    name: `🗺 Khu vực: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Xác minh: `,
                    value: message.guild.verified ? 'Server đã được xác minh' : `Server chưa được xác minh`,
                    inline: true
                },
                {
                    name: 'Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `Có ${message.guild.premiumSubscriptionCount} Boosters` : `Không có boosters`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Có ${message.guild.emojis.cache.size} emojis!` : 'Không có emojis' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }
}