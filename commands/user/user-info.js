const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "user-info",
    category: "User",
    aliases: ['ui'],
    description: "Check user info.",
    usage: '_user-info / a.ui',
    run: async (client, message, args) => {
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        var permissions = [];

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        var mention = user.displayName;

        let status;
        switch (user.presence.status) {
            case "online":
                status = ":white_check_mark: Trực tuyến";
                break;
            case "dnd":
                status = ":no_entry_sign: Không làm phiền";
                break;
            case "idle":
                status = ":crescent_moon: Chờ";
                break;
            case "offline":
                status = ":black_circle: Ngoại tuyến";
                break;
        }

        if(user.hasPermission("ADMINISTRATOR")){
            permissions.push("Admin - Quản trị server");
        }

        if(user.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick thành viên");
        }
        
        if(user.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban thành viên");
        }
        

        if(user.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Quản lý tin nhắn");
        }
        
        if(user.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Quản lý kênh");
        }

        if(user.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Quản lý biệt danh");
        }

        if(user.hasPermission("MANAGE_ROLES")){
            permissions.push("Quản lý vai trò");
        }

        if(user.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Quản lý webhook");
        }

        if(user.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Quản lý emoji");
        }

        if(user.hasPermission("MENTION_EVERYONE")){
            permissions.push("Ping người dùng");
        }

        if(permissions.length == 0){
            permissions.push("Không có các quyền nâng cao");
        }

        if ((args[0]) == client.user || (args[0]) == client.user.tag || (args[0]) == `<@${client.user.id}>` || (args[0]) == `<@!${client.user.id}>`){
            const botembed = new MessageEmbed()
            .setTitle(`Thông tin về ${user.user.username}`)
            .setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: ":regional_indicator_n::regional_indicator_a::regional_indicator_m::regional_indicator_e: Tên: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Hashtag: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: ":earth_americas: Biệt danh:",
                    value: `${user.displayName}`, 
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: ":triangular_flag_on_post: Trạng thái hiện tại: ",
                    value: status,
                    inline: true
                },
                {
                    name: ":video_game: Hoạt động: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                    inline: true
                },
                {
                    name: ':park: Hình đại diện: ',
                    value: `[Download link](${user.user.displayAvatarURL()})`
                },
                {
                    name: ':date: Ngày tạo acc: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: ':calendar: Ngày vào server: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '🌐 Đã vào tổng số server',
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '📺 Đã tham gia tổng số kênh',
                    value: `Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: '👥 Tổng số member trong các server',
                    value: `Serving ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: '⏳ Độ trễ của bot ( Ping )',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: ':control_knobs: Role sở hữu: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                },
                {
                    name: ":level_slider: Quyền của " +mention+ ":",
                    value: permissions.join(` | `),
                    inline: true
                },
            )
            .setTimestamp()

        await message.channel.send(botembed)
        } else {


            const embed = new MessageEmbed()
            .setTitle(`Thông tin về ${user.user.username}`)
            .setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: ":regional_indicator_n::regional_indicator_a::regional_indicator_m::regional_indicator_e: Tên: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Hashtag: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: ":earth_americas: Biệt danh:",
                    value: `${user.displayName}`, 
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: ":triangular_flag_on_post: Trạng thái hiện tại: ",
                    value: status,
                    inline: true
                },
                {
                    name: ":video_game: Hoạt động: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                    inline: true
                },
                {
                    name: ':park: Hình đại diện: ',
                    value: `[Download link](${user.user.displayAvatarURL()})`
                },
                {
                    name: ':date: Ngày tạo acc: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: ':calendar: Ngày vào server: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: ':control_knobs: Role sở hữu: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                },
                {
                    name: ":level_slider: Quyền của " +mention+ ":",
                    value: permissions.join(` | `),
                    inline: true
                },
            )
            .setTimestamp()
            await message.channel.send(embed)
        }
            }
        }