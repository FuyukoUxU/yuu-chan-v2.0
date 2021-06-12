module.exports = {
    name: 'del',
    category: "manage",
    description: "Delete message",
    usage: '_del [Số tin nhắn bị xóa]',
    run: async(_client, message, args) => {

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Không thể sử dụng lệnh vì bạn không có role manage sever :>>");

        if (!args[0]) return message.reply("Vui lòng nhập số lượng tin nhắn cần xóa. 🆗");
 
        if(isNaN(args[0])) return message.reply("Số không chính xác, vui lòng thử lại...🚫");
 
        if(args[0] > 100) return message.reply("Nhập 1 đến 100 ❗");
        
        if(args[0] < 1) return message.reply("Nhập 1 đến 100 ❕");
 
        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
    });
 
 }
}