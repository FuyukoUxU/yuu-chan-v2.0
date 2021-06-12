const { MessageEmbed } = require('discord.js');
// nhìn đây , có không dùng
const { getMember } = require('../../support/utils') // dùng function cho quen
module.exports = {
    name: 'avatar',
    category: 'user',
    aliases: ['ava'],
    description: 'Xem avatar của bạn',
    usage: '_avatar [@tag, ID]',
    run: async (client, message, args) => {
        const { getMember } = require('../../support/utils') // mang nó vào code nào cũng đc , agent xịn luôn
        const member = await getMember(message , args.join(' ')) //mnag cái này
            const URL = member.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024})
            const avatarEmbed = new MessageEmbed()
                .setImage(URL)
                .setURL(URL)
                .setTitle('Download ở đây :>>')
            message.channel.send(avatarEmbed)
    }
}