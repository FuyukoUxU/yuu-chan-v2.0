const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    category: "manage",
    description: "Check debug in bot...",
    usage: '_eval',
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Không thể sử dụng lệnh vì bạn không có role manage sever :>>");
        const embed = new MessageEmbed()
            .setTitle('Đánh giá cho bot nào...')
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .setTitle('Output: ')
                .setDescription(await data)
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new MessageEmbed()
                .setTitle('Đã xảy ra lỗi...')
            return await msg.edit(embed);

        }
    }
}