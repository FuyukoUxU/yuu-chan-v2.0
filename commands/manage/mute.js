const ms = require('ms');
module.exports = {
    name: 'mute',
    category: "manage",
    description: "Mute một thằng lol nào đó trong server :>>",
    usage: '_mute [@username] [time]',
    run: async(client, message, args, cmd ) => { 
        const target = message.mentions.users.first();
        if (target) {

            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> đã bị mute !`);
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> đã bị mute trong ${ms(ms(args[1]))} !`);

            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> đã được unmute !`)
            }, ms(args[1]));
        } else {
            message.channel.send('Không tìm thấy thằng lol này trong server :/');
        }
    }
}