const fs = require("fs");
module.exports.config = {
	name: "ara",
    version: "1",
	hasPermssion: 0,
	credits: "Aesther",
	description: "no prefix",
	commandCategory: "𝗩𝗢𝗖𝗔𝗟",
    usePrefix:false,
	usages: "vocal",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("ara")==0 || (event.body.indexOf("Ara")==0 || (event.body.indexOf("aRa")==0 || (event.body.indexOf("arA")==0)))) {
		var msg = {
				body: "「ara~~」",
				attachment: fs.createReadStream(__dirname + `/noprefix/ara.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😌", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }