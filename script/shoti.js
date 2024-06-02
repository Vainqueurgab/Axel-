module.exports.config = {
	name: "shoti",
	version: "1.0.0",
	role: 0,
	credits: "libyzxy0",
	description: "Generate a random tiktok video.",
	usages: "[]",
	cooldown: 0,
	hasPrefix: false,
};

module.exports. run = async ({ api, event, args }) => {

	api.setMessageReaction("😫😫💨🍴💭", event.messageID, (err) => {
		 }, true);
api.sendTypingIndicator(event.threadID, true);

	const { messageID, threadID } = event;
	const fs = require("fs");
	const axios = require("axios");
	const request = require("request");
	const prompt = args.join(" ");

	if (!prompt[0]) { api.sendMessage("▪〉𝙎𝙃𝙊𝙏𝙄📲💬...♪*ﾟ", threadID, messageID);
		}

 try {
	const response = await axios.post(`https://shoti-srv1.onrender.com/api/v1/get`, { apikey: `$shoti-1hg4gifgnlfdmeslom8` });

	let path = __dirname + `/../public/image/shoti.mp4`;
	const file = fs.createWriteStream(path);
	const rqs = request(encodeURI(response.data.data.url));
	rqs.pipe(file);
	file.on(`finish`, () => {
		 setTimeout(function() {
			 api.setMessageReaction("☠️", event.messageID, (err) => {
					}, true);
			return api.sendMessage({
			body: `⬇💨𝙍𝘿𝙈▪𝙎𝙃𝙊𝙏𝙄📲💬...♪*ﾟ:\n━━━━━━━━━━━\n▪🆔𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘 : @${response.data.data.user.username}\n▪🆔𝗡𝗜𝗖𝗞𝗡𝗔𝗠𝗘 : ${response.data.data.user.nickname}`, 
			attachment: fs.createReadStream(path)
		}, threadID);
			}, 5000);
				});
	file.on(`error`, (err) => {
			api.sendMessage(`Error: ${err}`, threadID, messageID);
	});
	 } catch (err) {
		api.sendMessage(`Error: ${err}`, threadID, messageID);
	};
};
