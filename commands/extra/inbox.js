const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require('fs');
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif", ".bmp"];
const videoExt = [".mp4", ".webm", ".mov"];


module.exports = {
    name: "inbox",
    category: "extra",
    aliases: ['ib'],
    description: "Repeat the message to channel",
    usage: '_ib [id chat room] [Message]',
    run: async (client, message, args) => {
    if (message.channel.type !== 'dm') return message.channel.send("Bạn cần chat inbox với bot để gửi tin !");
    if (message.content.length > 1024) return message.channel.send('Tin nhắn gửi đi chỉ dưới 1024 kí tự.');
 
    else {
        
        const CHANNELID = (args[0]);
        if (!args[0]) return message.channel.send("Bạn đã không chỉ định chat room cần gửi");
        if (!args.slice(1).join(" ")) return message.channel.send("Bạn đã không chỉ định tin nhắn của mình");
        var mes = (args.slice(1).join(" "));

        await message.react('✅');
        await message.react('❌');
        message.channel.send('Check trong chat room bạn nhé!');

        
        const cfsChannel = client.channels.cache.get(CHANNELID);
        const embed = new MessageEmbed()
           .setTitle(':mailbox_with_mail: Tin nhắn được chuyển')
           .setDescription(`:scroll: Nội dung:\n${mes}`)
           .setColor('RANDOM')
           .setFooter(`💬 Người gửi: ${message.author.tag}`, message.author.displayAvatarURL())
           .setTimestamp();
        if (message.attachments.array().length > 0) {
            let attachment = message.attachments.array()[0];
        picExt.forEach (ext => {
            if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
        });
        videoExt.forEach(ext => {
            if (attachment.name.endsWith(ext)) cfsChannel.send(attachment);
        });
        }
        cfsChannel.send(embed);

    }
}
}
