const { Client, Message, MessageEmbed } = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "ascii",
    category: "extra",
    description: "Chuyển chữ thành mã ASCII",
    usage: '_ascii [Font - Chạy _ascii để xem bảng font] [text]',
    run: async (client, message, args) => {
        var fon = args[0];
        if(!args[0]){
            let errorembed = new MessageEmbed()
            .setTitle("Chưa có Font !")
            .setDescription("Chọn font trong bảng sau (1)")
            .setColor("RANDOM")
            .addField('Font', `3-d | 3x5 | 5lineoblique | acrobatic | alligator | alligator2 | alphabet | avatar | banner | banner3-D | banner3 | banner4 | barbwire | basic | bell | big | bigchief | binary | block | bubble | bulbhead | calgphy2 | caligraphy | catwalk | chunky | coinstak | colossal | computer | contessa | contrast | cosmic | cosmike | cyberlarge | cybermedium | cybersmall | cygnet | diamond | digital | doh | doom | dotmatrix | drpepper | eftichess | eftifont | eftipiti | eftirobot | eftitalic | eftiwall | eftiwater | epic | fender | fourtops | fuzzy | goofy | gothic |graffiti | hollywood | invita | isometric1 | isometric2 | isometric3 | isometric4 | italic | jazmine | kban`, true)
            .setTimestamp()
            let errorembed2 = new MessageEmbed()
            .setTitle("Chưa có Font !")
            .setDescription("Chọn font trong bảng sau (2)")
            .setColor("RANDOM")
            .addField('Font', `larry3d | lcd | lean | letters | linux | lockergnome | madrid | marquee | maxfour | mike | mini | mirror | nancyj-fancy | nancyj-underlined | nancyj | nipples | o8 | orge | pawp | peaks | pebbles | pepper | poison | puffy | pyramid | rectangles | relief | relief2 | rev | roman | rot13 | rounded | rowancap | rozzo | sblood | script | serifcap | shadow | short | slant | slide | slscript | small | smisome1 | smkeyboard | smscript | smshadow | smslant | smtengwar | speed | stampatello | standard | starwars | stellar | stop | straight | swan | tanja | tengwar | term | thick | thin | threepoint | ticks | ticksslant | tinker-toy | tombstone | trek | twopoint | univers | usaflags | weird`, true)
            .setTimestamp()
          return message.channel.send(errorembed).then(message.channel.send(errorembed2));
        }



        if (!args.slice(1).join(" ")) return message.channel.send("Chưa có text");
        figlet.text(
            args.slice(1).join(" "),
            {
                font: `${fon}`,
            },
            async (err, data) => {
                message.channel.send(`\`\`\`${data}\`\`\``);
            }
        );
    },
};