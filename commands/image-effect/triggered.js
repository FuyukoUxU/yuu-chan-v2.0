const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
        name: 'triggered',
        description: 'TRIGGERED...',
        aliases: ["trig"],
        usage: '_triggered / _trig <@user>',
        category: "image-effect",
    run: async (client, message, args) => {
 //   const m = client.findMember(message, args, true);
 if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
 let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
 let m = await message.channel.send("**Xin chờ...**");   
 let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Triggered().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "trig.gif");
    m.delete({ timeout: 3000 });
    message.channel.send(attach);
  },
};

