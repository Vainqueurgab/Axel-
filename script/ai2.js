const axios = require('axios');

module.exports.config = {
		name: "Ai",
		version: 1.0,
		credits: "OtinXSandip",
		description: "AI",
		hasPrefix: false,
		usages: "{pn} [prompt]",
		aliases: ["gpt4","ai","Olive","arsene","Gabriel","safro"],
		cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
		try {
				const prompt = args.join(" ");
				if (!prompt) {
						await api.sendMessage("℘༒𝗔𝗫𝗘𝗟 𝗖𝗢𝗣𝗜𝗟𝗢𝗧༒℘:
\n━━━━━━━━━━━\n\n 𝘴𝘢𝘭𝘶𝘵 , 𝘲𝘶𝘦𝘭 𝘦𝘴𝘵 𝘷𝘰𝘵𝘳𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯𝘴.💭 ", event.threadID);
						return;
				}

				const response = await axios.get(`https://hiroshi-rest-api.replit.app/ai/jailbreak?ask=${encodeURIComponent(input)}`);
				const answer = response.data.answer;

				await api.sendMessage(answer, event.threadID);
		} catch (error) {
				console.error("Error:", error.message);
		}
};
