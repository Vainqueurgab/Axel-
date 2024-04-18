const axios = require('axios');

module.exports.config ={
		name: "imagine",
		version: "1.0",
		role: 0,
		usage: "{pn} [prompt]",
		credits: "Samir Œ",
		description: "Generate images based on prompts",
		hasPrefix: false,
};


module.exports.run = async function ({ api, event, args }) {
		let prompt = args.join(" ");
		let style = 16; 
		let aspectRatio = "1:1"; 

		for (let i = 0; i < args.length; i++) {
				if (args[i] === "--style" && args[i + 1]) {
						style = parseInt(args[i + 1]);
				}
				if (args[i] === "--ar" && args[i + 1]) {
						aspectRatio = args[i + 1];
				}
		}

		try {
				const apiUrl = `https://apis-samir.onrender.com/api/generateImage?style=${style}&prompt=${encodeURIComponent(prompt)}&aspectRatio=${aspectRatio}`;

				const response = await axios.get(apiUrl, { responseType: 'stream' });

				if (!response.data) {
						return api.sendMessage("Failed to retrieve image.", event.threadID);
				}

				return api.sendMessage({
						body: 'generated request successful',
						attachment: response.data
				}, event.threadID);
		} catch (error) {
				console.error(error);
				return api.sendMessage("Failed to retrieve image.", event.threadID);
		}
};
