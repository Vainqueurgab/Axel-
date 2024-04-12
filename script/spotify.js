const axios = require("axios");
const fs = require('fs');

const balanceDataPath = process.cwd() + "/db/balance.json";

const deductionAmount = 200; 

module.exports.config = {
  name: "spotify",
  version: "69",
  hasPermission: 0,
  credits: "Kshitiz api by deku", // kira
  description: "play song from spotify",
  usages: "Spotify <title>",
  usePrefix: false,
  commandCategory: "music",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args, message }) {
  const { threadID, messageID, senderID } = event; 
  const songName = args.join(" ");
  if (!songName) {
    return api.sendMessage("Please provide a song name.", threadID);
  }

  const loadingMessage = await api.sendMessage("downloading your song🕐..", threadID);

  try {
    
    let balanceData = JSON.parse(fs.readFileSync(balanceDataPath, 'utf8'));
    if (balanceData[senderID] < deductionAmount) {
      
      await api.sendMessage("Your balance is not enough to perform this action.", threadID);
      return;
    }
    balanceData[senderID] -= deductionAmount;
    fs.writeFileSync(balanceDataPath, JSON.stringify(balanceData));

    const spotifyResponse = await axios.get(`https://deku-rest-api.onrender.com/spotify?q=${encodeURIComponent(songName)}`);
    const trackURL = spotifyResponse.data.result;
    if (!trackURL) {
      throw new Error("No track found for the provided song name.");
    }

    const downloadResponse = await axios.get(trackURL, { responseType: 'stream' });
    const filePath = `${__dirname}/cache/${Date.now()}.mp3`;
    const writer = fs.createWriteStream(filePath);
    downloadResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log("File downloaded successfully:", filePath);

    await api.sendMessage({
      body: `🎧 Playing: ${songName}`,
      attachment: fs.createReadStream(filePath)
    }, threadID); 

    console.log("Audio sent successfully.");

  } catch (error) {
    console.error("Error occurred:", error);
    api.sendMessage(`An error occurred: ${error.message}`, threadID); 
  } finally {
    api.unsendMessage(loadingMessage.messageID); 
   }
};
