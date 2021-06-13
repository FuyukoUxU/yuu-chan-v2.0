const {Message, MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports= {
    name: 'mute',
    category: "manage",
    description: "Mute một member yêu cầu phải có role quản lí server :>",
    usage: '_mute [@user]',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermision('MANAGE_MESSAGES')) return message.channels.send('Bạn không thể sử dụng lệnh này :>')
        const Member = message.memtions.member.first() || message.guild.members.cache.get(arg[0])
        if(!Member) return message.channel.send('Không tìm thấy thành viên :/')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('Không tìm thấy muted role, hãy create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    } 
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Role muted đã được tạo.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(roles.id)) return message.channel.send(`Đã mute ${Member.displayName} ròi đó !!!`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} đang bị mute.`)
    }
}