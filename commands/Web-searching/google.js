const Discord = require("discord.js");
const request = require("node-superfetch");
const search = require("youtube-search");

module.exports = {
    name: 'google',
    category: "Web-searching",
    aliases: ['gg'],
    description: "Tìm kiếm với Google 🌏",
    usage: '_google / _gg [  Search query ]',
    run: async (client, message, args) => {
    let googleKey = "AIzaSyCyNaZmYhv4Ci-BPqEMK4KOG8YkGKJtVJA"; // key
    let csx = "34bcb8d8f1802c578"; // id tìm nhá
    let query = args.join(" ");
    let result;

    if (!query) return message.channel.send("Nhập 1 từ khóa tìm kiếm hợp lệ 🔎");

    href = await search(query);
    if (!href) return message.channel.send("Không có kết quả ❌");

    const embed = new Discord.MessageEmbed()
    .setTitle(href.title)
    .setDescription(href.snippet)
    .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
    .setURL(href.link)
    .setColor("RANDOM")
    .setFooter("Bot by Shirakami Yuu | Powered by Google")

    return message.channel.send(embed);

    async function search(query) {
        const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
            key: googleKey, cx: csx, safe: "off", q: query
        });

        if (!body.items) return null;
        return body.items[0];
    }
}}