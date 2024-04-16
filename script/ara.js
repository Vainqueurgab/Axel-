const fs = require("fs");
module.exports.config = {
	name: "yamete",
        version: "1",
	hasPermssion: 0,
	credits: "Aesther",
	description: "no prefix",
	commandCategory: "𝗩𝗢𝗖𝗔𝗟",
        hasPrefix:false,
	usages: "vocal",
        cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("yamete")==0 || (event.body.indexOf("yamate")==0 || (event.body.indexOf("aRa")==0 || (event.body.indexOf("Yamete")==0)))) {
		var msg = {
				body: "(⸝⸝⸝╸▵╺⸝⸝⸝)",
				attachment: fs.createReadStream(__dirname + `/event/yamete.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😨", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
