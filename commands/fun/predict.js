const discord = require('discord.js')
module.exports = {
    name: 'predict',
    category: "fun",
    description: 'Dự đoán tỷ số cuối cùng của trận đấu giữa hai câu lạc bộ bóng đá.',
    usage: '_predict <fc1> vs <fc2>',
    run: async (client , message , args) => {
        if(!message.content.includes(`vs`)) {
            return message.reply('Lệnh sai , yêu cầu nhập <Đội 1> vs <Đội 2>');
        };
        const doibong = args.join(' ').split('vs')
        if(doibong.length > 2) return message.channel.send('Bạn không thể để nhiều đội đá với nhau !')
        const one = Math.floor(Math.random() * 5)
        const two = Math.floor(Math.random() * 5)
        let win = ''
        const arguments = args.join(' ')
        if(one > two ){
            win = doibong[0]
        } else if(one < two){
            win = doibong[1]
        } else if(one == two) {
            win = 'Hòa nhau !'
        }
        const predictTalks = [
            'Đây sẽ là một trận đấu khó khăn, nó sẽ kết thúc với tỉ số:',
            'Kỹ năng tuyệt vời từ người chơi, nhưng luôn có người chiến thắng, trận đấu sẽ kết thúc với tỉ số',
            'Hầu như không thể đoán trước, đã kết thúc:',
            'Tôi không chắc, tôi nghĩ nó có thể sẽ kết thúc với tỉ số:',
            'Đây sẽ là một trận đấu khó khăn, nó sẽ kết thúc với tỉ số:',
        ];

        const predictTalk = Math.floor(Math.random() * predictTalks.length);

        const score = `${one} - ${two}`;

        const embed = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`YuuVNBot PREDICTION:`)
        .addFields(
            {name: 'Trận đấu:', value: arguments, inline: false},
            {name: 'Chiến thắng:', value: win},
            {name:'Dự đoán:', value: `${predictTalks[predictTalk]} \`${score}\``, inline: false},
        );

        message.channel.send(embed)

    },
};