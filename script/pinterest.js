const axios = require('axios');
const fs = require("fs");

const cooldowns = {}; 

module.exports.config = {
  name: "pin",
  version: "1.4",
  hasPermission: 0,
  credits: "Hazeyy",
  description: "( 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝 )",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usages: "( 𝚂𝚎𝚊𝚛𝚌𝚑 𝙸𝚖𝚊𝚐𝚎𝚜 𝚘𝚗 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝 )",
  cooldowns: 20,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("pin") === 0 || event.body.indexOf("Pin") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  const userId = event.senderID;
  const cooldownTime = module.exports.config.cooldowns * 20000;

  if (cooldowns[userId] && Date.now() - cooldowns[userId] < cooldownTime) {
    const remainingTime = Math.ceil((cooldowns[userId] + cooldownTime - Date.now()) / 20000);
    await api.sendMessage(`🖕 𝗗𝗢𝗡'𝗧 𝗦𝗣𝗔𝗠 🖕 \n\n» (~￣³￣)~ just wait ${remainingTime}Seconds « `, event.threadID, event.messageID);
    return;
  }

  let text = args.join(" ");
  const search = text.split(">")[0].trim();
  if (!search) {
    return api.sendMessage("𝗡.𝗕 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧:.\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝙿𝚒𝚗 [ 𝚗𝚊𝚖𝚎 ] - [ 𝚊𝚖𝚘𝚞𝚗𝚝 ] \n\n𝙸𝚏 𝚗𝚘 𝚌𝚘𝚞𝚗𝚝 𝚄𝚜𝚎: 𝙿𝚒𝚗 [ 𝚗𝚊𝚖𝚎 ] 𝚒𝚝 𝚠𝚒𝚕𝚕 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎 5 𝚒𝚖𝚊𝚐𝚎𝚜 𝚠𝚒𝚝𝚑 𝚗𝚘 𝚌𝚘𝚞𝚗𝚝 𝚗𝚎𝚎𝚍𝚎𝚍.", event.threadID, event.messageID);
  }
  let count;
  if (text.includes("-")) {
    count = text.split("-")[1].trim()
  } else {
    count = 5;
  }

  try {
    const response = await axios.get(`https://hazee-social-downloader-9080f854bdab.herokuapp.com/pinterest?search=${search}`);
    api.sendMessage('🕟 | 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚘𝚗 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...', event.threadID, event.messageID);

    const data = response.data;
    if (data.error) {
      return api.sendMessage(data.error, event.threadID);
    } else {
      let attachment = [];
      let storedPath = [];
      for (let i = 0; i < data.count; i++) {
        if (i == count) break;
        let path = __dirname + "/cache/" + Math.floor(Math.random() * 99999999) + ".jpg";
        let pic = await axios.get(data.data[i], { responseType: "arraybuffer" });
        fs.writeFileSync(path, pic.data);
        storedPath.push(path);
        attachment.push(fs.createReadStream(path))
      }
      api.sendMessage({ body: `► 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧:\n▪﹝🔎﹞𝚂𝙴𝙰𝚁𝙲𝙷 : '${search}\n\n▪﹝🔢﹞𝙽𝚄𝙼𝙱𝙴𝚁: ${attachment.length} - ${data.count} «`, attachment: attachment }, event.threadID, () => {
        for (const item of storedPath) {
          fs.unlinkSync(item)
        }
      }, event.messageID);
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚍𝚊𝚝𝚊 𝚏𝚛𝚘𝚖 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝 𝙰𝙿𝙸.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
