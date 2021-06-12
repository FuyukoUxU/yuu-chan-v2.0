module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['p'],
    description: 'Xem độ trễ của bot',
    usage: '_ping',
    run: (client, message, args) => {
        message.channel.send(`Ping ${client.ws.ping} ms`)
    }
}