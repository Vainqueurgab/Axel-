const axios = require('axios');

module.exports.config = {
	name: "blue",
	version: "1.0.0",
	role: 0,
	credits: "Jonell Magallanes",
	description: "cmd ai powered by blue",
	hasPrefix: false,
	usage:"blue [your content]",
	cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
	const content = encodeURIComponent(args.join(" "));

	if (!content) {
		return api.sendMessage("𝗣𝗥𝗢𝗩𝗜𝗗𝗘 𝗣𝗥𝗢𝗠𝗣𝗧 blue 🔵", event.threadID, event.messageID);
	}

	api.sendMessage("☁️ 𝗧𝗬𝗣𝗜𝗡𝗚 𝗣𝗟𝗦 𝗪𝗔𝗜𝗧 ☁️", event.threadID, event.messageID); 

	const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

	try {
		const response = await axios.get(apiUrl);
		const reply = response.data.reply;

		api.sendMessage(reply, event.threadID, event.messageID);
	} catch (error) {
		console.error("Error fetching data:", error.message);
		api.sendMessage("An error occurred while processing your request.", event.threadID);
	}
};
