const img = require('images-scraper')

const google = new img({
    puppeteer : { // cái module nặng 300mb
        args: ['--no-sandbox'],
        headless : true,
    }
})

module.exports = {
    name: 'google-image',
    category: "Web-searching",
    aliases: ['img'],
    description: "Tìm kiếm hình ảnh với google 🌏",
    usage: '_google-image / _img [  Search query ]',
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}