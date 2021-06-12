const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    name: "play",
    category: "music",
    info: 'Không nên tìm lệnh ở dòng Lệnh mở rộng nhé ! Khá hại mắt đấy',
    aliases: ['loop','skip','queue','stop','autoplay','resume','pause','queue','seek','jump','vol','3d','bassboost','echo','karaoke','nightcore','vaporwave',`flanger`,`gate`,`haas`,`reverse`,`surround`,`mcompand`,`phaser`,`tremolo`,`earwax`],
    description: "Lệnh phát nhạc",
    usage: '_[Câu lệnh]',
    dong: '------------------------------------------------------------------------',
    dong1: '`play`, `skip`, `stop`, `pause`, `resume`',
    dong2: '`loop`, `queue`, `seek`, `jump`',
    dong3: '`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`',
    dong4: '`vol`, `autoplay`',
    run: async (client, message, args , command , distube) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice rồi thử lại!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Bạn không có quyền kết nối kênh voice');
        if (!permissions.has('SPEAK')) return message.channel.send('Bạn không có đủ quyền với kênh voice');

    if (command == "play")
        distube.play(message, args.join(" "));

    if (command == "loop"){
        if(0 <= Number(args[0]) && Number(args[0]) <= 2){
            distube.setRepeatMode(message,parseInt(args[0]))
            embedbuilder(client, message, "GREEN", "Chế độ lặp được đặt:", `${args[0].replace("0", "Tắt").replace("1", ":repeat_one: Lặp bài hiện tại").replace("2", ":repeat: Lặp danh sách phát")}`)
        }
        else{
            embedbuilder(client, message, "RED", "Lỗi", ':loop: Bạn cần đặt chế độ lặp hợp lệ !\nHướng dẫn: Ấn _loop (số) | `0`: Tắt lặp ; `1`: Lặp bài hiện tại ; `2`: Lặp cả danh sách phát')
        }
    };

    if (command == "stop") {
        distube.stop(message);
        embedbuilder(client, message, "RED", "Đang thoát...", `:eject: Em đã rời khỏi voice channel rồi nhé !`)
    };

    if (command == "skip") {
        try{
            distube.skip(message);
            embedbuilder(client, message, "YELLOW", "Bỏ qua", `:track_next: Đã bỏ qua bài hát ! `)
        } catch {
          return;
        }
    }

    if (command == "pause") {
        try{
            distube.pause(message);
            distube.resume(message);
            distube.pause(message);
            embedbuilder(client, message, "YELLOW", "Tạm dừng", `:pause_button: Đang tạm dừng bài hát ! `)
        } catch {
          return;
        }
    }

    if (command == "resume") {
        try{
            distube.resume(message);
            embedbuilder(client, message, "YELLOW", "Tiếp tục", `:arrow_forward: Bài hát tiếp tục phát ! `)
        } catch {
          return;
        }
    }

    if (command == "autoplay") {
        let mode = distube.toggleAutoplay(message);
        embedbuilder(client, message, "YELLOW", "Tự động phát", "Chế độ hiện tại `" + (mode ? "On" : "Off") + "`")
    }

    if (command == "queue") {
        let queue = distube.getQueue(message);
        if(queue) {
        let curqueue = queue.songs.map((song, id) =>
        `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n");
        return  embedbuilder(client, message, "GREEN", "Danh sách phát hiện tại (10 Video tiếp theo)", curqueue)
        } else {
        if(!queue){
            return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        }}
    };

    if( command == "seek") {
        if (!args[0]) return message.reply("Hãy nhập số giây cần tua")
        if(isNaN(args[0])) return message.reply("Số giây không hợp lệ");
        distube.seek(message, Number(args[0]*1000));
        embedbuilder(client, message, "GREEN", "Tua video", `:fast_forward: Tua đến giây \`${args[0]}\``)
    };

    if( command == "vol") {
        if (!args[0]) return message.reply("Bạn hãy nhập mức âm lượng `%`")
        if(isNaN(args[0])) return message.reply("Mức âm lượng không hợp lệ🚫");
        if (args[0] > 49) {
            embedbuilder(client, message, "GREEN", "Volume", `:loud_sound: Âm lượng hiện tại là \`${args[0]} %\``)
            return distube.setVolume(message, args[0]);
        }
        if (0 < args[0] && args[0] < 50) {
            embedbuilder(client, message, "GREEN", "Volume", `:sound: Âm lượng hiện tại là \`${args[0]} %\``)
            return distube.setVolume(message, args[0]);
        }
        if (args[0] == 0) {
            embedbuilder(client, message, "GREEN", "Volume", `:mute: Bạn đã tắt tiếng !`)
            return distube.setVolume(message, args[0]);
        }
    };

    if( command === "jump") {
        let queue = distube.getQueue(message);
        if(0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length){
            embedbuilder(client, message, "RED", "Phát nhạc", `Chuyển tới bài ${parseInt(args[0])} !`)
            return distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Số thứ tự nhạc không hợp lệ."));
        }
        else{
            embedbuilder(client, message, "RED", "Lỗi", `Nhập số thứ tự bài hợp lệ` )
        }
        }
    
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].includes(command)) {
        let filter = distube.setFilter(message, command);
        return embedbuilder(client, message, "YELLOW", ":arrows_counterclockwise: Đang tải hiệu ứng nhạc: ", filter || "Tắt")
    };
    function embedbuilder(client, message, color, title, description, url, thumbnail){
        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL());
        if(title) embed.setTitle(title);
        if(description) embed.setDescription(description);
        if(thumbnail) embed.setThumbnail(thumbnail);
        if(url) embed.setURL(url);
        return message.channel.send(embed);
    }

}};
