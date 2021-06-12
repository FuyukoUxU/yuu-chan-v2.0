const { getAudioUrl } = require('google-tts-api');

module.exports = {
    name: 'speak',
    aliases: ['s', 'talk'],
    category: 'fun',
    description: 'Bot đọc tin nhắn của bạn trên kênh voice',
    usage: '_speak <Nội dung>',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Vui lòng nhập gì đó để bot nói!');
        const string = args.join(' ');
        if (string.leghth > 200) return message.channel.send('Vui lòng nhập dưới 200 kí tự :>>');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Vào một phòng voice nào đó đi chế ơi :>> nếu bạn muốn sử dụng lệnh này !!!');
        const audioURL = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });
        try {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(audioURL);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                });
            });
        }
        catch(e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau :>>')
            console.error(e);
        };
    },
};