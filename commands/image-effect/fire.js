const Discord = require('discord.js');
const config = require('../../config.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(config.AME_API);

module.exports = {
        name: 'fire',
        description: 'Đốt cháy @user nào đó',
        usage: '_fire <@user>',
        category: "image-effect",
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send("**Xin chờ...**");
        let buffer = await AmeAPI.generate("fire", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new Discord.MessageAttachment(buffer, "fire.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);

    }
}

