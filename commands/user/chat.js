const axios = require('axios');
module.exports = {
    name: 'chat',
    category: 'user',
    description: 'Chat với bot AI',
    usage: '_chat',
    run: async (client, message, args) => {
        try {
            const res = await axios.get(`http://api.brainshop.ai/get?bid=156523&key=PZFCMCnDiVsyMnTj&uid=1&msg=${encodeURIComponent(args.join(''))}`);
            message.channel.send(res.data.cnt);
        }
        catch(e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau !!!');
        }
    }
}