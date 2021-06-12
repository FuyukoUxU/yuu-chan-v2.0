const { Client, MessageEmbed, Message, Util ,Collection} = require('discord.js');
const client = new Client();
const { parse } = require('twemoji-parser');
const axios = require('axios');
const { readdirSync } = require('fs');
const ms = require('ms');
const db = require('quick.db');
const config = require('./config.json')
const DisTube = require('distube')
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
const status = (queue) => `Âm lượng: \`${queue.volume}%\` | Hiệu ứng hiện tại: \`${queue.filter || "Tắt"}\` | Vòng lặp: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Danh sách phát" : "Bài hát này" : "Tắt"}\` | Tự động phát: \`${queue.autoplay ? "Bật" : "Tắt"}\``;
distube
    .on("playSong", (message, queue, song) => {
        embedbuilder(client, message, "RANDOM", "Đang phát nhạc :musical_note:", `Tên bài hát: \`${song.name}\` - \`${song.formattedDuration}\` \n\nYêu cầu bởi: ${song.user}\n${status(queue)}`, `${song.url}`, `${song.thumbnail}`)
    })

    .on("addSong", (message, queue, song) => {
        embedbuilder(client, message, "RANDOM", "Thêm bài hát :musical_note:", `Tên bài hát: \`${song.name}\` - \`${song.formattedDuration}\` \n\nYêu cầu bởi: ${song.user}\nLink bài \`${song.url}\``, `${song.url}`, `${song.thumbnail}`)
    })

    .on("playList", (message, queue, playlist, song) => {
        embedbuilder(client, message, "RANDOM", "Đang phát danh sách phát :scroll:", `Tên danh sách phát: \`${playlist.name}\` - Có  \`${playlist.songs.length} bài trong danh sách\` \n\nYêu cầu bởi: ${song.user}\n\nBắt đầu phát: \`${song.name}\`  -  \`${song.formattedDuration}\`\n${status(queue)}`, `${playlist.url}`)
    })

    .on("addList", (message, queue, playlist , song) => {
        embedbuilder(client, message, "RANDOM", "Thêm vào danh sách phát", `Tên danh sách phát: \`${playlist.name}\` - Có  \`${playlist.songs.length} bài hát trong danh sách\` \n\nYêu cầu bởi: ${song.user}`, `${playlist.url}`)
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        embedbuilder(client, message, "YELLOW", ":mag_right: Đang tìm kiếm...", `**Chọn một tùy chọn từ bên dưới.\nLưu ý: Chỉ nhập số thứ tự của bài trong phần tìm kiếm**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\`\n\`${song.url}\``).join("\n")}\n*Đợi 60 giây hoặc ấn phím bất kì để hủy tìm kiếm*`).then(m => m.delete({ timeout: 60000 }));
    })
    .on("searchCancel", (message) => {
        embedbuilder(client, message, "RED", `Tìm kiếm đã bị hủy bời người dùng`, "")
    })
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("Đã xảy ra lỗi: " + e);
    return;
    });

    function embedbuilder(client, message, color, title, description, url, thumbnail){
        let embed = new MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL());
        if(title) embed.setTitle(title);
        if(description) embed.setDescription(description);
        if(thumbnail) embed.setThumbnail(thumbnail);
        if(url) embed.setURL(url);
        return message.channel.send(embed);
    }
client.on("ready", () => {
    console.log(`${client.user.username} đã sẵn sàng hoạt động!!!`);

    client.user.setPresence({
        activity: {
            name: "Bot by Shirakami Yuu. Đang phục vụ cho Des Comunity Server.",
            type: 'PLAYING'
        },
        status: 'online'
    })
})

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {             
    if (message.author.bot) return;
    if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Trạng thái afk của bạn đã bị xóa (${info})`)
    }
    if (message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }
    }
    let prefix = config.prefix
    if(db.has(`prefix-${message.guild.id}`)) prefix = db.get(`prefix-${message.guild.id}.prefix`)
    if (!message.content.startsWith(prefix)) {
        if (message.channel.id == '848358121462300692') {
                var searchURL = `https://api.simsimi.net/v1/?lang=vi&cf=false&text=${encodeURIComponent(message.content)}`;
            axios.get(searchURL)
              .then(function (response) {
                message.channel.send(response.data.success);
            });
        } else return;
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, cmd , distube);

});
client.login(config.token)