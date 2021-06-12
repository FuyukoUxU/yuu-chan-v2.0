const Discord = require("discord.js");
const request = require("node-superfetch");
const search = require("youtube-search");

module.exports = {
    name: 'youtube',
    category: "Web-searching",
    aliases: ['yt'],
    description: "Tìm kiếm video với Youtube 🌏",
    usage: '_youtube / _yt [  Search query ]',
    run: async (client, message, args) => {
    let googleKey = "AIzaSyAFhhbjJiNKl9ZaV1FQDSmGZe_QHy7PtPg";
    let csx = "033cc98d3deaf29b0"; // cái youtube cho key luôn
    let query = args.join(" ");
    let result;

    if (!query) return message.channel.send("Please enter the query 🔎");

    href = await search(query);
    if (!href) return message.channel.send("Unknown search ❌");

    message.channel.send(`**This is video I can find ... ⏮ ▶ ⏭**`);
    message.channel.send(href.link);
    const embed = new Discord.MessageEmbed()
    .setTitle(href.title)
    .setDescription(href.snippet)
    .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
    .setURL(href.link)
    .setColor("RANDOM")
    .setFooter("Bot Shirakami Yuu | Powered by Google")

    return;

    async function search(query) {
        const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
            key: googleKey, cx: csx, safe: "off", q: query
        });

        if (!body.items) return null;
        return body.items[0];
    }
}}