const moment = require("moment-timezone");
const time = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:s");
const axios = require("axios");
const request = require('request');
const fs = require("fs");

module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  cooldown: 10,
  role: 0,
  hasPrefix: true,
  aliases: ['18+'],
  description: "this command is 18+",
  usage: "{pref}[name of cmd]",
  credits: "Ainz"
};

module.exports.run = async function({ api, event }) {
  let response = await axios.post('https://your-shoti-service-apis.onrender.com/api/v1/get', { apikey: "shoti-1hgn30msgapp542i0qg" });
    const userInfo = response.data.data.user;
    const videoInfo = response.data.data;
    const title = videoInfo.title;
    const durations = videoInfo.duration;
    const region = videoInfo.region;
    const username = userInfo.username;
    const nickname = userInfo.nickname;
  var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
  var rqs = request(encodeURI(response.data.data.url));
  rqs.pipe(file);
  file.on('finish', () => {
    return api.sendMessage({
      body: `[ 𝗔𝗨𝗧𝗢𝗠𝗔𝗧𝗘𝗗 𝗕𝗢𝗧 ]\n\n✨𝙷𝚎𝚛𝚎\'𝚜 𝚢𝚘𝚞𝚛 𝚜𝚑𝚘𝚝𝚒!\n𝘛𝘐𝘛𝘓𝘌: ${title}\n𝘕𝘐𝘊𝘒𝘕𝘈𝘔𝘌: ${nickname}\n𝘜𝘚𝘌𝘙𝘕𝘈𝘔𝘌: ${username}\n𝘋𝘜𝘙𝘈𝘛𝘐𝘖𝘕𝘚: ${durations}\n𝘋𝘈𝘛𝘌 𝘈𝘕𝘋 𝘛𝘐𝘔𝘌: ${time}`, 
      attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
    }, event.threadID, event.messageID)
  })
  file.on('error', (err) => {
      api.sendMessage(`Shoti Error: ${err}`, event.threadID, event.messageID);
     })

};
