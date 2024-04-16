const axios = require('axios');
const fs = require('fs');
const request = require('request');
const moment = require("moment-timezone");
const time = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:s");

const shotiAutoState = {};
const shotiAutoInterval = {};
let videoCounter = 0;
let errorVideoCounter = 0;
const lastVideoError = {};
const defaultInterval = 60 * 60 * 1000; 

module.exports.config = {
  name: "shoticron",
  version: "1.0.0",
  cooldown: 10,
  role: 1,
  hasPrefix: true,
  aliases: ['admin', 'shoti'],
  description: "this command will send u an shotivideo it depends on your settings ",
  usage: "{pref}[name of cmd] [on/off] or [setinterval (number)(minutes)] or [resetcount] or [status]",
  credits: "Ainz"
};

const shoticron = async (api, event, threadID) => {
  try {
    let response = await axios.post('https://your-shoti-service-apis.onrender.com/api/v1/get', { apikey: 'shoti-1hgn30msgapp542i0qg' });
    console.log('API Response:', response.data);

    if (response.data.error) {
      throw new Error(`API Error: ${response.data.error}`);
    }

    const userInfo = response.data.data.user;
    const videoInfo = response.data.data;
    const title = videoInfo.title;
    const durations = videoInfo.duration;
    const region = videoInfo.region;
    const username = userInfo.username;
    const nickname = userInfo.nickname;

    videoCounter++;

    const tid = event.threadID;
    const file = fs.createWriteStream('./script/cache/shoti-jane.mp4');
    const rqs = request(encodeURI(response.data.data.url));
    rqs.pipe(file);

    file.on('finish', () => {
      api.sendMessage({
        body: `(AUTOBOT)\n\n𝚃𝚑𝚒𝚜 𝚒𝚜 𝚊𝚞𝚝𝚘𝚖𝚊𝚝𝚎𝚍 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚜𝚑𝚘𝚝𝚒 video🌹\n\n\n𝚃𝚒𝚝𝚕𝚎: ${title}\n\n𝙽𝚒𝚌𝚔𝚗𝚊𝚖𝚎: ${nickname}\n\n𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${username}\n\n𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗𝚜: ${durations}\n\n𝙳𝚊𝚝𝚎 𝚊𝚗𝚍 𝚃𝚒𝚖𝚎: ${time}`,
        attachment: fs.createReadStream('./script/cache/shoti-jane.mp4'),
      }, threadID, () => {
        fs.unlink('./script/cache/shoti-jane.mp4', (err) => {
          if (err) {
            console.error('🔴 | 𝙴𝚛𝚛𝚘𝚛 𝚍𝚎𝚕𝚎𝚝𝚒𝚗𝚐 𝚝𝚎𝚖𝚙𝚘𝚛𝚊𝚛𝚢 𝚏𝚒𝚕𝚎:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error('🔴 | 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚝𝚑𝚎 𝚟𝚒𝚍𝚎𝚘:', error);
    lastVideoError[threadID] = error.message;
    videoCounter++;
    errorVideoCounter++;
  }
};

module.exports.run = async ({ api, event, admin }) => {
  const threadID = event.threadID;
  const commandArgs = event.body.toLowerCase().split(' ');

  const allowedAdminUID = `${admin[0]}`;
  if (commandArgs[1] === 'setinterval') {
    const newIntervalValue = parseFloat(commandArgs[2]);
    const newIntervalUnit = commandArgs[3]?.toLowerCase();

    if (!isNaN(newIntervalValue) && newIntervalValue > 0) {
      let newInterval;

      if (newIntervalUnit === 'hour' || newIntervalUnit === 'hours') {
        newInterval = newIntervalValue * 60 * 60 * 1000; // Convert hours to milliseconds
        const unit = newIntervalValue === 1 ? 'hour' : 'hours';
        api.sendMessage(`🕒 | 𝙸𝚗𝚝𝚎𝚛𝚟𝚊𝚕 𝚝𝚒𝚖𝚎 𝚜𝚎𝚝 𝚝𝚘 ${newIntervalValue} ${unit}.`, threadID);
      } else if (newIntervalUnit === 'minute' || newIntervalUnit === 'minutes') {
        newInterval = newIntervalValue * 60 * 1000; // Convert minutes to milliseconds
        const unit = newIntervalValue === 1 ? 'minute' : 'minutes';
        api.sendMessage(`🕒 | 𝙸𝚗𝚝𝚎𝚛𝚟𝚊𝚕 𝚝𝚒𝚖𝚎 𝚜𝚎𝚝 𝚝𝚘 ${newIntervalValue} ${unit}.`, threadID);
      } else {
        api.sendMessage('🔴 | 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚞𝚜𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎 "minutes" or "hours".', threadID);
        return;
      }

      shotiAutoInterval[threadID] = newInterval;
    } else {
      api.sendMessage('🔴 | 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚒𝚗𝚝𝚎𝚛𝚟𝚊𝚕 𝚝𝚒𝚖𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚙𝚘𝚜𝚒𝚝𝚒𝚟𝚎 𝚗𝚞𝚖𝚋𝚎𝚛.', threadID);
    }
    return;
  } else if (commandArgs[1] === 'interval') {
    const currentInterval = shotiAutoInterval[threadID] || defaultInterval;
    const unit = currentInterval === 60 * 60 * 1000 ? 'hour' : 'minute';
    api.sendMessage(`🟡 | 𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝚒𝚗𝚝𝚎𝚛𝚟𝚊𝚕 𝚒𝚜 𝚜𝚎𝚝 𝚝𝚘 ${currentInterval / (unit === 'hour' ? 60 * 60 * 1000 : 60 * 1000)} ${unit}.`, threadID);
    return;
  } else if (commandArgs[1] === 'on') {
    if (!shotiAutoState[threadID]) {
      shotiAutoState[threadID] = true;
      const intervalUnit = shotiAutoInterval[threadID] ? (shotiAutoInterval[threadID] === 60 * 60 * 1000 ? 'hour' : 'minute') : 'hour';
      const intervalValue = shotiAutoInterval[threadID] ? shotiAutoInterval[threadID] / (intervalUnit === 'hour' ? 60 * 60 * 1000 : 60 * 1000) : 1;
      const intervalMessage = `𝚠𝚒𝚕𝚕 𝚜𝚎𝚗𝚍 𝚟𝚒𝚍𝚎𝚘 𝚎𝚟𝚎𝚛𝚢 ${intervalValue} ${intervalUnit}${intervalValue === 1 ? '' : 's'}`;

      api.sendMessage(`🟢 | 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚏𝚎𝚊𝚝𝚞𝚛𝚎 𝚒𝚜 𝚝𝚞𝚛𝚗𝚎𝚍 𝚘𝚗, ${intervalMessage}.`, threadID);

      shoticron(api, event, threadID);

      setInterval(() => {
        if (shotiAutoState[threadID]) {
          shoticron(api, event, threadID);
        }
      }, shotiAutoInterval[threadID] || defaultInterval);
    } else {
      api.sendMessage('𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚏𝚎𝚊𝚝𝚞𝚛𝚎 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚝𝚞𝚛𝚗𝚎𝚍 𝚘𝚗', threadID);
    }
    return;
  } else if (commandArgs[1] === 'off') {
    shotiAutoState[threadID] = false;
    api.sendMessage('🟠 | 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚏𝚎𝚊𝚝𝚞𝚛𝚎 𝚒𝚜 𝚝𝚞𝚛𝚗𝚎𝚍 𝚘𝚏𝚏 ', threadID);
    return;
  } else if (commandArgs[1] === 'status') {
    const statusMessage = shotiAutoState[threadID] ? 'on' : 'off';
    const intervalMessage = shotiAutoInterval[threadID] ? `Interval time set to ${shotiAutoInterval[threadID] / (shotiAutoInterval[threadID] === 60 * 60 * 1000 ? 60 : 1000)} minutes.` : 'Interval time not set. Using default 1-hour interval.';
        const errorMessage = lastVideoError[threadID] ? `𝙻𝚊𝚜𝚝 𝚟𝚒𝚍𝚎𝚘 𝚎𝚛𝚛𝚘𝚛: ${lastVideoError[threadID]}` : '';

        api.sendMessage(`🟢 | 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚏𝚎𝚊𝚝𝚞𝚛𝚎 𝚒𝚜 𝚌𝚞𝚛𝚛𝚎𝚗𝚝𝚕𝚢 ${statusMessage}.\n\n🟡 | 𝚃𝚘𝚝𝚊𝚕 𝚟𝚒𝚍𝚎𝚘 𝚜𝚎𝚗𝚝: ${videoCounter}\n\n🟣 | 𝚃𝚘𝚝𝚊𝚕 𝚟𝚒𝚍𝚎𝚘 𝚎𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚝: ${errorVideoCounter}\n\n${errorMessage}`, threadID);
        return;
      } else if (commandArgs[1] === 'resetcount') {
        // Check if the user has permission to reset counts
        if (event.senderID === allowedAdminUID) {
          videoCounter = 0;
          errorVideoCounter = 0;
          api.sendMessage('🟢 | 𝚅𝚒𝚍𝚎𝚘 𝚌𝚘𝚞𝚗𝚝𝚜 𝚑𝚊𝚟𝚎 𝚋𝚎𝚎𝚗 𝚛𝚎𝚜𝚎𝚝.', threadID);
        } else {
          api.sendMessage('🔴 | 𝚈𝚘𝚞 𝚍𝚘𝚗𝚝 𝚑𝚊𝚟𝚎 𝚊𝚗𝚢 𝚙𝚎𝚛𝚖𝚒𝚜𝚜𝚒𝚘𝚗𝚜 𝚝𝚘 𝚛𝚎𝚜𝚎𝚝 𝚌𝚘𝚞𝚗𝚝𝚜.', threadID);
        }
        return;
      }

      api.sendMessage('🔴 | 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚞𝚜𝚎.\n\n\n🟢 | "shoticron on", "shoticron off" - 𝚝𝚘 𝚃𝚞𝚛𝚗 (𝙾𝙽) 𝚘𝚛 𝚃𝚞𝚛𝚗 (𝙾𝙵𝙵).\n\n\n🟠 | "shoticron setinterval <minutes/hours>" - 𝚂𝚎𝚝 𝚝𝚑𝚎 𝚝𝚒𝚖𝚎𝚛 𝚏𝚘𝚛 𝚟𝚒𝚍𝚎𝚘\n\n\n🟡 | "shoticron interval" - 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚒𝚗𝚝𝚎𝚛𝚟𝚊𝚕\n\n\n🔵 |  "shoticron status" - 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚜𝚝𝚊𝚝𝚞𝚜 𝚘𝚏 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.', threadID);
      };
