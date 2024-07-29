const fs = require("fs");

module.exports.config = {
		name: "prefix",
		version: "1.0.1",
		role: 0,
		credits: "cliff",
		description: "Display the prefix of your bot",
		hasPrefix: false,
		usages: "prefix",
		cooldown: 5,
		aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
};

module.exports.run = function ({ api, event, prefix, admin }) {
		const { threadID, messageID } = event;

		if (event.body.toLowerCase() === `${prefix}prefix`) {
				api.sendMessage(
						"This command cannot be executed manually.",
						threadID,
						messageID
				);
				return;
		}

		api.sendMessage(
				{
						body: '🎐𝖳𝗁𝗂𝗌 𝗂𝗌 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑: ' + prefix : "🔖𝖲𝗈𝗋𝗋𝗒 i don't 𝗁𝖺𝗏𝖾  𝗉𝗋𝖾𝖿𝗂𝗑",
						attachment: fs.createReadStream(__dirname + "https://i.ibb.co/mHXpgqJ/image.jpg")
				},
				threadID,
				(err, messageInfo) => {
						if (err) return console.error(err);

						const voiceFile = fs.readFileSync(__dirname + "");
						api.sendMessage(
								{
										attachment: voiceFile,
										type: "audio",
										body: "Hey, listen to my prefix information!",
								},
								threadID,
								() => {}
						);
						api.setMessageReaction("🚀", messageInfo.messageID, (err) => {}, true);
				}
		);
};
