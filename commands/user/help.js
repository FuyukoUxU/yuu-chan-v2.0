const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const { category } = require('./chat');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'user',
    description: 'Hướng dẫn xài lệnh',
    usage: '_help [tên lệnh]',
    run: async (client, message, args) => {
        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};

function getAll(client,message) {
    const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Sử dụng cú pháp   _help  [commands]   để thông tin về lệnh đó :')
        .addField('Yuu Info:','Prefix của Yuu là: _\nBot đang trong quá trình phát triển bởi Shirakami Yuu#5382 ') 
        .setFooter(`Bot by Shirakami Yuu`)
        .setThumbnail("https://cdn.discordapp.com/avatars/847774419938181140/d13a9586bc5a7b3563a202914fbd86ea.jpg?size=1024")
        .setTimestamp()

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(', ')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `Không tìm thấy lệnh **${input.toLowerCase()}**`;
    
    if (!cmd) return message.channel.send(embed.setColor('RED').setDescription(info));

    if (cmd.name) info = `**Tên lệnh**: ${cmd.name}`;
    if (cmd.name !== 'play') {
    if (cmd.aliases) info += `\n**Tên gọi khác**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    }
    if (cmd.description) info += `\n**Chi tiết lệnh**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Cách sử dụng lệnh**: ${cmd.usage}`;
        embed.setFooter(`Cú pháp: <> = bắt buộc, [] = không bắt buộc`);
    }
// Nhạc cmd
    // Chỉ dành cho lệnh nhạc vì nó có quá nhiều command :)
    if (cmd.dong) info += `\n------------------${cmd.dong}`;
    if (cmd.dong1) info += `\n**Lệnh phát cơ bản**: ${cmd.dong1}`;
    if (cmd.dong2) info += `\n**Lệnh phát nâng cao**: ${cmd.dong2}`;
    if (cmd.dong3) info += `\n**Hiệu ứng nhạc**: ${cmd.dong3}`;
    if (cmd.dong4) info += `\n**Cài đặt nhạc**: ${cmd.dong4}`;
    return message.channel.send(embed.setColor('GREEN').setDescription(info));
}