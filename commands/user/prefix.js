const db = require('quick.db') 
module.exports = {
    name : 'prefix',
    category: 'user',
    description: 'Đặt prefix tùy chỉnh',
    usage: '_prefix',
    run: async ( client , message , args) => {
        if(!args[0]) {
            if(!db.has(`prefix-${message.guild.id}`)) return message.reply('Bạn chưa đặt prefix tùy chỉnh , không thể clear prefix !')
            await db.delete(`prefix-${message.guild.id}`)
            message.channel.send('Đã xóa prefix tùy chỉnh , prefix hiện tại là `_`')
        } else {
            const prefix = args[0]
            if(args[1]) return message.reply('Prefix không thể là 1 cụm từ !')
            await db.set(`prefix-${message.guild.id}`, { prefix: prefix })
            message.reply('Bạn đã đặt prefix tùy chỉnh là `' + prefix + '` thành công ✅')
        }
    }
}