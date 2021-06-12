const { utc } = require('moment');
const os = require('os');
const { MessageEmbed, version: djsversion } = require('discord.js');
const { formatBytes, laysodep } = require('../../support/utils');
const ms = require('ms');
module.exports = {
    cooldown: 0,
    name: 'stats',
    category: 'User',
    description: 'Hiển thị trạng thái của Yuu-chan!',
    usage: '_stats',
    run: async (client, message, args) => {
        const guildManager = client.guilds.cache;
        const core = os.cpus()[0];
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .addField("Thông tin chung", [
                `**:earth_asia:--> Tên bot:** ${client.user.tag} (${client.user.id})`,
                `**:chart_with_upwards_trend:--> Số lệnh:** ${client.commands.filter(el => el.category && !el.ownerOnly).size} lệnh`,
                `**:alarm_clock:--> Uptime:** ${ms(client.uptime)}`,
                `**:map:--> Server:** ${laysodep(guildManager.size)}`,
                `**:bust_in_silhouette:--> Users:** ${laysodep(guildManager.reduce((a, b) => a + b.memberCount, 0))}`,
                `**:speech_balloon:--> Channels:** ${laysodep(client.channels.cache.size)}`,
                `**:calendar_spiral:--> Ngày tạo bot:** ${utc(client.user.createdTimestamp).format('MM/DD/YYYY HH:mm:ss')}`,
                `**:floppy_disk:--> Node.js version:** ${process.version}`,
                `**:file_folder:--> Bot version: ** v2.0-Beta`,
                `**:dividers:--> Discord.js version:** v${djsversion}`,
                `**:bookmark_tabs:--> License:** ShirakamiYuu#5382`,
                '\u200b',
            ])
            .addField('Cấu hình', [
                `**:desktop:--> Platfrom: ** ${process.platform}`,
                `**:rocket:--> CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${core.model}`,
                `\u3000 Speed: ${core.speed}MHz`,
                `**:pager:--> RAM:**`,
                `\u3000 Đã sử dụng: ${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB`,
                `\u3000 Tổng số RAM: ${Math.trunc(os.totalmem() / 1024 / 1000)} MB`,
                `**:gear:--> Hostname:** ${os.hostname()}`,
            ])
            .setTimestamp()
            .setFooter(`Created By: Shirakami Yuu`, client.user.displayAvatarURL());
        message.channel.send(embed);
    },
};