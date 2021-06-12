const Discord = require('discord.js');
const canvacord = require('canvacord')

module.exports = {
        name: 'comment',
        description: 'Hiển thị văn bản của bạn dưới dạng Nhận xét trên Youtube - By Shirakami Yuu',
        aliases: ["com"],
        category: "image-effect",
        usage: '_comment / _com <Nội dung>',
        accessableby: "",
    run: async (client, message, args) => {
        const mem = message.mentions.members.first()
        if(!mem) {
            const comment = args.slice(0).join(" ");
            if(!comment) return message.channel.send(`❌ Cung cấp điều gì đó để nhận xét!`)
            try {    
            let yt = await canvacord.Canvas.youtube({"avatar":message.author.avatarURL({ format: 'jpg'}),"username":message.author.username, "content":args.slice(0).join(" ")})
            let attachment = new Discord.MessageAttachment(yt, 'comment.png')
            message.channel.send(attachment)
        }catch(err) {
            console.log(err.message);
            const embed2 = new Discord.MessageEmbed()
        .setTitle(`Đã xảy ra lỗi . Note : Lưu ý: Tính năng này sẽ không hoạt động nếu Người dùng chứa các ký tự không mong muốn trong Tên người dùng của mình.`)
        .setColor("RANDOM")
        message.channel.send(embed2)
        }}
    
        else if(mem) {
            const comment = args.slice(1).join(" ");
            if(!comment) return message.channel.send(`❌ Cung cấp điều gì đó để nhận xét!`)
            try {    
            let yt = await canvacord.Canvas.youtube({"avatar":mem.user.avatarURL({ format: 'jpg'}),"username":mem.user.username, "content":args.slice(1).join(" ")})
            let attachment1 = new Discord.MessageAttachment(yt, 'comment1.png')
            message.channel.send(attachment1)
        }catch(err) {
            console.log(err.message);
            const embed3 = new Discord.MessageEmbed()
        .setTitle(`Đã xảy ra lỗi . Note : Lưu ý: Tính năng này sẽ không hoạt động nếu Người dùng chứa các ký tự không mong muốn trong Tên người dùng của mình.`)
        .setColor("RANDOM")
        message.channel.send(embed3)
        }
    
        }
        
    }
}