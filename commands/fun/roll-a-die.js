module.exports = {
    name: 'roll',
    category: "fun",
    aliases: ['rl'],
    description: "Roll a die",
    usage: '_roll / _rl < Number in die >',
    run: async(_client, message, args) => {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min;};
        if(!args[0]){
            var b = getRandomInt(1, 6);
            return message.channel.send(":game_die: Roll results: "+b+".")}
        a = parseInt(args[0])
        if (typeof a != "number"){
            return func.Loi(message, "You must type number of die < 1 / 2 / 3 / 4 / 5 / 6 >");}
            if (a>6) return message.channel.send("You must type number of die < 1 / 2 / 3 / 4 / 5 / 6 >")
            if (a<1) return message.channel.send("You must type number of die < 1 / 2 / 3 / 4 / 5 / 6 >")
        var b = getRandomInt(1, 6);
        if (a===b) {
        return message.channel.send(":trophy: You are very lucky: "+b+".")
    } else {
        return message.channel.send(":slot_machine: Wish you luck next time: "+b+" | Your result: "+a+"")
    }
}}