module.exports = {
    name: 'say',
    category: 'user',
    aliases: ['s'],
    description: 'Bot xóa tin nhắn và say lại',
    usage: '_say <Nội dung>',
    run: (client, message, args) => {
        if (message.deletable) message.delete()
            message.channel.send(args.join(' '))
    }
}