const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "redroom",
  version: "1.0.0",
  cooldown: 60,
  role: 0,
  hasPrefix: true,
  aliases: ['porno'],
  description: "this command may is 18+",
  usage: "{pref}[name of cmd]",
  credits: "Hazeyy"
};
module.exports.run = async function({ api, event }) {
  try {
    api.sendMessage("📀 | 𝚂𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

    const { data } = await axios.get("https://hazeyybold.replit.app/hazeyy", { responseType: "arraybuffer" });
    console.log('🔴 𝚁𝚎𝚍𝚛𝚘𝚘𝚖 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', data);

    const randomFileName = `${Math.floor(Math.random() * 99999999)}.mp4`;
    const filePath = path.join(__dirname, "cache", randomFileName);

    fs.writeFileSync(filePath, Buffer.from(data, 'binary'));

    const message = {
      body: "🎥 𝙷𝚎𝚛𝚎\'𝚜 𝚢𝚘𝚞𝚛 𝚟𝚒𝚍𝚎𝚘 𝚠𝚊𝚝𝚌𝚑 𝚠𝚎𝚕𝚕.",
      attachment: fs.createReadStream(filePath),
    };

    api.sendMessage(message, event.threadID, (err, msgInfo) => {
      if (!err) {
        api.sendMessage("🐱 | 𝚁𝚎𝚖𝚒𝚗𝚍𝚎𝚛:\n\n𝚃𝚑𝚎 𝚟𝚒𝚍𝚎𝚘 𝚠𝚒𝚕𝚕 𝚋𝚎 𝚜𝚎𝚗𝚝 𝚒𝚗 𝚊 𝚏𝚎𝚠 𝚖𝚒𝚗𝚞𝚝𝚎𝚜/𝚜𝚎𝚌.", event.threadID, msgInfo.messageID);
      } else {
        console.error('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘...', err);
        api.sendMessage('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 » https://www.facebook.com/Hazeyy0 « 𝚝𝚘 𝚏𝚘𝚡 𝚝𝚑𝚒𝚜 𝙰𝙿𝙸 𝚛𝚒𝚐𝚑𝚝 𝚊𝚠𝚊𝚢.', event.threadID, event.messageID);
      }
    });
  } catch (error) {
    console.error('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘...', error);
    api.sendMessage('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 » https://www.facebook.com/Hazeyy0 « 𝚝𝚘 𝚏𝚒𝚡 𝚝𝚑𝚒𝚜 𝙰𝙿𝙸 𝚛𝚒𝚐𝚑𝚝 𝚊𝚠𝚊𝚢.', event.threadID);
  }
};
