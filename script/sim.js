const axios = require("axios");
let isEnabled = true; 
module.exports.config = {
   name: "sim",
   version: "4.3.7",
   hasPermssion: 0,
   credits: "Eugene Aguilar", 
   description: "Chat with the best sim Chat",
   commandCategory: "sim",
   usages: "on/off",
   cooldowns: 2
};

module.exports.run = async function ({ api, event, args }) {
    try {
        if (args[0] === "off") {
            isEnabled = false;
            return api.sendMessage("SimSimi is now turned off.", event.threadID, event.messageID);
        } else if (args[0] === "on") {
            isEnabled = true;
            return api.sendMessage("SimSimi is now turned on.", event.threadID, event.messageID);
        } else {
            const ask = args.join(" ");
            const response = await axios.get(`https://eurix-api.replit.app/sim?ask=${encodeURIComponent(ask)}`);
            const result = response.data.respond;
            api.sendMessage(result, event.threadID, event.messageID);
        }
    } catch(error) {
        api.sendMessage(`Error: ${error}`, event.threadID);
        console.log(error);
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    try {
        if (!isEnabled) return; 

        const message = event.body.toLowerCase();
        const response = await axios.get(`https://eurix-api.replit.app/sim?ask=${encodeURIComponent(message)}`);
        const result = response.data.respond;
        api.sendMessage(result, event.threadID, event.messageID);
    } catch(error) {
        api.sendMessage(`Error: ${error}`, event.threadID);
        console.log(error);
    }
};