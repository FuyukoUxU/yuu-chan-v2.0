module.exports = {
    name: 'random',
    category: "fun",
    aliases: ['rd'],
    description: "Tạo số ngẫu nhiên : (0-1000000)",
    usage: '_random / _rd < Số tối đa ngẫu nhiên >',
    run: async(_client, message, args) => {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min;};
        if(!args[0]){
            var b = getRandomInt(0, 1000000);
            return message.channel.send("Kết quả ngẫu nhiên: "+b+".")}
        a = parseInt(args[0])
        if (typeof a != "number"){
            return func.Loi(message, "Request: Number");}
        var b = getRandomInt(1, a);
        return message.channel.send("Câu trả lời: "+b+".")
    }
}