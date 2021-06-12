const Discord = require('discord.js');
const axios = require('axios')
module.exports = {
    name: "simsimi",
    category: "fun",
    aliases: ['sim'],
    description: "Nói chuyện với simsimi :>>",
        usage: '_simsimi <Tin nhắn>',
    run: async (client, message, args) => {
        const chat = args.join(' ')
        if(!chat) return message.channel.send('Vui lòng nhập gì đó để nói chuyện với simsimi')
            var searchURL = `https://api.simsimi.net/v1/?lang=vi&cf=false&text=${encodeURIComponent(chat)}`;
        axios.get(searchURL)
          .then(function (response) {
            message.channel.send(response.data.success);
          })
}}