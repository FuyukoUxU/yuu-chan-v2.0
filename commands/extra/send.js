const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require('fs');
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif", ".bmp"];
const videoExt = [".mp4", ".webm", ".mov"];


module.exports = {
    name: "send",
    category: "extra",
    description: "Gửi tin nhắn từ Yuu-chan tới @user",
    usage: '_send [@user] [Message]',
    run: async (client, message, args) => {
      if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
      if (!user)
        return message.channel.send(
          `Tên user không đúng.`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Chưa có tin nhắn");
        var mes = (args.slice(1).join(" "));
        const embed = new MessageEmbed()
           .setTitle(':mailbox_with_mail: Tin nhắn được gửi qua bot')
           .setDescription(`:scroll: Nội dung:\n${mes}`)
           .setColor('RANDOM')
           .setFooter(`💬 Người gửi: ${message.author.tag}`, message.author.displayAvatarURL());
        
        if (message.attachments.array().length > 0) {
            let attachment = message.attachments.array()[0];
        picExt.forEach (ext => {
            if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
        });
        videoExt.forEach(ext => {
            if (attachment.name.endsWith(ext)) user.send(attachment);
        });
    }
      user.user
        .send(embed)
        if (message.deletable) message.delete();
    }
}
