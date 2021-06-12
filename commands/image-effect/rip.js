const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
        name: 'rip',
        description: ':musical_note: Astronomia :musical_note:  time...',
        aliases: ["rip"],
        usage: '_rip <@user>',
        category: "image-effect",
    run: async (client, message, args) => {
 //   const m = client.findMember(message, args, true);
 if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
 let m = await message.channel.send("https://www.youtube.com/watch?v=j9V78UbdzWI");   
 let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Rip().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "rip.png");
    message.channel.send(attach);
  },
};