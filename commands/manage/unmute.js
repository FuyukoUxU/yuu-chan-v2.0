module.exports = {
    name: 'unmute',
    category: "manage",
    description: "Unmute một thằng lol nào đó trong server :>>",
    usage: '_unmute [@username]',
    run: async(client, message, args, cmd ) => { 
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> đã được unmute !`);
        } else{
            message.channel.send('Không tìm thấy thằng lol này trong server :/');
        }
    }
}