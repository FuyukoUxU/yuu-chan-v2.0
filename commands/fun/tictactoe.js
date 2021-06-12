const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    aliases: ['xo'],
    description: 'Chơi XO 2 người',
    usage: '_tictactoe / _xo [@user]',
    category: 'fun',

    run : async(client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Tag @user chơi cùng vào nhé!')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}