const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server-info",
    category: "user",
    aliases: ['svif'],
    description: "Check info của server.",
    usage: '_server-info / _svif',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
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
                    name: "Trùm cuối: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Thành viên: ",
                    value: `Có ${message.guild.memberCount} thành viên!`,
                    inline: true
                },
                {
                    name: "Members Online: ",
                    value: `Có ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} thành viên online!`,
                    inline: true
                },
                {
                    name: "Số bot: ",
                    value: `Có ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "Ngày tạo server: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Số role: ",
                    value: `Có ${message.guild.roles.cache.size} roles ở server này.`,
                    inline: true,
                },
                {
                    name: `🗺 Khu vực: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Verified: `,
                    value: message.guild.verified ? 'Server đã được verified' : `Server chưa verified`,
                    inline: true
                },
                {
                    name: 'Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `Có ${message.guild.premiumSubscriptionCount} Boosters` : `Không có boosters nào`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Có ${message.guild.emojis.cache.size} emojis!` : 'Không có emoji!' ,
                    inline: true
                },
            )
        await message.channel.send(embed)
    }
}