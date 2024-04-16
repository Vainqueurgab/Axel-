const fs = require('fs');
const axios = require('axios');
const path = require('path');

module.exports.config = {
  name: "fb",
  version: "1.0.0",
  aliases:["fbvideo"],
  hasPermission: 0,
  credits: "Eugene Aguilar",
  description: "Download Facebook video link",
  commandCategory: "media",
  usages: "fb [link]",
  cooldowns: 8,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const q = args.join(" ");
    if (!q) {
      api.sendMessage(`▪[🔗]𝙿𝙻𝙴𝙰𝚂𝙴 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰 𝚄𝚁𝙻 𝙵𝚁𝙾𝙼 𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺.𝙲𝙾𝙼`, event.threadID, event.messageID);
      return;
    }

    api.sendMessage(`🕗 𝗙𝗕.𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗜𝗡𝗚...`, event.threadID, event.messageID);

    const response = await axios.get(`https://hoanghao.me/api/facebook/download?url=${q}`);
    const videoUrl = response.data.data.video;
    const t = response.data.data.title;

    const pathie = path.join(__dirname, `cache`, `eurix.mp4`);

const stream = await axios.get(videoUrl, { responseType: "arraybuffer"});

    fs.writeFileSync(pathie, Buffer.from(stream.data, 'binary'));

    await api.sendMessage({ body: `✔️ | 𝙁𝘽 𝙑𝙄𝘿𝙀𝙊 [🔗]\n\n[📑]Title: ${t}`, attachment: fs.createReadStream(pathie) }, event.threadID, event.messageID);
  } catch (e) {
    api.sendMessage(`Error downloading Facebook video!!\n${e}`, event.threadID, event.messageID);
    console.error(e); 
  }
};
