const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'manage',
    description: "Bỏ ban người dùng.",
    usage: '_unban [@username] <Lí do bỏ ban>',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Bạn không có quyền unban!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('Nhập ID người dùng cần unban').then(m => m.delete({ timeout: 5000 }));

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send('Người dùng đó không hợp lệ').then(m => m.delete({ timeout: 5000 }));
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'Không có lí do';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`Gỡ ban thành công cho ${user.user.tag}`)
                    .setColor('#00ff00')
                    .addField('User ID', user.user.id, true)
                    .addField('User Tag', user.user.tag, true)
                    .addField('Lí do bị ban', user.reason != null ? user.reason : 'no reason')
                    .addField('Lí do bỏ ban', reason)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`Người dùng đó ${member.tag} không bị ban`)
                    .setColor('#ff0000')
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send('Có lỗi sảy ra ...')
        });

    }
}
