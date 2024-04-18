const axios = require('axios');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const simpleYT = require('simple-youtube-api');
const { google } = require('googleapis');
const mime = require('mime-types');
const getFBInfo = require("@xaviabot/fb-downloader");

module.exports.config = {
  name: "autolink",
  joinNoti: [],
  leaveNoti: [],
  version: "69",
  credits: "jonell",
  description: "Download media from Facebook" 
}

const downloadDirectory = path.resolve(__dirname, 'cache');

module.exports.handleEvent = async function ({ api, event }) {
  if (event.body !== null) {
    const regEx_tiktok = /https:\/\/(www\.|vt\.)?tiktok\.com\//;
    const link = event.body;
    if (regEx_tiktok.test(link)) {
      api.setMessageReaction("📥", event.messageID, () => {}, true);
      try {
        const response = await axios.post(`https://www.tikwm.com/api/`, { url: link });
        const data = response.data.data;
        const videoStream = await axios({
          method: 'get',
          url: data.play,
          responseType: 'stream'
        });
        const fileName = `TikTok-${Date.now()}.mp4`;
        const filePath = path.join(downloadDirectory, fileName);
        const videoFile = fs.createWriteStream(filePath);

        videoStream.data.pipe(videoFile);

        videoFile.on('finish', () => {
          videoFile.close(() => {
            console.log('Downloaded video file.');

            api.sendMessage({
              body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖳𝗂𝗄𝖳𝗈𝗄 \n\n𝙲𝚘𝚗𝚝𝚎𝚗𝚝: ${data.title}\n\n𝙻𝚒𝚔𝚎𝚜: ${data.digg_count}\n\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}\n\n🟢ᗩƐᔕƬHƐᖇ⚪- ˕ •マ`,
              attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
              fs.unlinkSync(filePath); // Delete the video file after sending it
            });
          });
        });
      } catch (error) {
        api.sendMessage(`Error when trying to download the TikTok video: ${error.message}`, event.threadID, event.messageID);
            }
          }
        }

  if (event.body !== null) {
    (async () => {
      const apiKey = 'AIzaSyCYUPzrExoT9f9TsNj7Jqks1ZDJqqthuiI';
      if (!apiKey) {
        console.error('No Google Drive API key provided.');
        return;
      }

      const drive = google.drive({ version: 'v3', auth: apiKey });
      const gdriveLinkPattern = /(?:https?:\/\/)?(?:drive\.google\.com\/(?:folderview\?id=|file\/d\/|open\?id=))([\w-]{33}|\w{19})(&usp=sharing)?/gi;
      let match;

      while ((match = gdriveLinkPattern.exec(event.body)) !== null) {
        const fileId = match[1];

        try {
          const res = await drive.files.get({ fileId: fileId, fields: 'name, mimeType' });
          const fileName = res.data.name;
          const mimeType = res.data.mimeType;
          const extension = mime.extension(mimeType);
          const destFilename = `${fileName}${extension ? '.' + extension : ''}`;
          const destPath = path.join(downloadDirectory, destFilename);

          console.log(`Downloading file "${fileName}"...`);
          const dest = fs.createWriteStream(destPath);
          let progress = 0;

          const resMedia = await drive.files.get(
            { fileId: fileId, alt: 'media' },
            { responseType: 'stream' }
          );

          await new Promise((resolve, reject) => {
            resMedia.data
              .on('end', () => {
                console.log(`Downloaded file "${fileName}"`);
                resolve();
              })
              .on('error', (err) => {
                console.error('Error downloading file:', err);
                reject(err);
              })
              .on('data', (d) => {
                progress += d.length;
                process.stdout.write(`Downloaded ${progress} bytes\r`);
              })
              .pipe(dest);
          });

          console.log(`Sending message with file "${fileName}"...`);
          await api.sendMessage({ body: `𝖦𝗈𝗈𝗀𝗅𝖾 𝖣𝗋𝗂𝗏𝖾 𝖫𝗂𝗇𝗄 \n\n𝙵𝙸𝙻𝙴𝙽𝙰𝙼𝙴: ${fileName}\n\n🟢ᗩƐᔕƬHƐᖇ⚪- ˕ •マ`, attachment: fs.createReadStream(destPath) }, event.threadID);

          console.log(`Deleting file "${fileName}"...`);
          await fs.promises.unlink(destPath);
          console.log(`Deleted file "${fileName}"`);
        } catch (err) {
          console.error('Error processing file:', err);
        }
      }
    })();
  }
  

  if (event.body !== null) {
    const youtube = new simpleYT('AIzaSyCMWAbuVEw0H26r94BhyFU4mTaP5oUGWRw');
    const youtubeLinkPattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const videoUrl = event.body;

    if (youtubeLinkPattern.test(videoUrl)) {
      try {
        const video = await youtube.getVideo(videoUrl);
        const stream = ytdl(videoUrl, { quality: 'highest' });
        const filePath = path.join(downloadDirectory, `${video.title}.mp4`);
        const file = fs.createWriteStream(filePath);

        stream.pipe(file);

        file.on('finish', () => {
          file.close(() => {
            api.sendMessage({body: "𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 Youtube\n\n🟢ᗩƐᔕƬHƐᖇ⚪- ˕ •マ:", attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath));
          });
        });
      } catch (error) {
        console.error('Error downloading video:', error);
      }
    }
  }
      
  if (event.body !== null) {
    const fbvid = path.join(downloadDirectory, 'video.mp4');

    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory, { recursive: true });
    }

        const facebookLinkRegex = /https:\/\/www\.facebook\.com\/\S+/;

        const downloadAndSendFBContent = async (url) => {
          try {
            const result = await getFBInfo(url);
            let videoData = await axios.get(encodeURI(result.sd), { responseType: 'arraybuffer' });
            fs.writeFileSync(fbvid, Buffer.from(videoData.data, "utf-8"));
            return api.sendMessage({body: "𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖵𝗂𝖽𝖾𝗈\n\n🟢ᗩƐᔕƬHƐᖇ⚪- ˕ •マ", attachment: fs.createReadStream(fbvid) }, event.threadID, () => fs.unlinkSync(fbvid));
          }
          catch (e) {
            return console.log(e);
          }
        };

        if (facebookLinkRegex.test(event.body)) {
          downloadAndSendFBContent(event.body);
    }
  }
}
