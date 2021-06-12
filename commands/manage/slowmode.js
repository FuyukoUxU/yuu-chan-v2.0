const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    category: 'manage',
    description: "Đặt chế độ chậm cho server.",
    usage: `_slowmode [thời gian (5s / 1m / 6h)] <Lý do set slow> (Channel bạn chạy bot sẽ bị set slow)\n_slowmode off (Tắt slow)`,
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Bạn không có quyền chỉnh sửa channel!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('Bạn chưa thêm thời gian').then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'Không có lý do';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('Slowmode đã tắt').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Tắt Slowmode')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('không phải là thời gian hợp lệ!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('Giới hạn thời gian quá cao, chỉ có thể nhỏ hơn 6 giờ').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode đã được đặt trong ${args[0]}`);

        embed.setTitle('Bật Slowmode')
            .addField('Thời gian: ', args[0])
            .addField('Lí do: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}
