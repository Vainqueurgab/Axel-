const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'hercai',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "An AI command powered by Hercai",
  usage: "hercai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`👻Please рr♡vﭐ꒯㉹🔥 a զﮠ㉹Ֆ†ﭐ♡ո❄ ♡r🌀 Ֆ†a†㉹Ѫ㉹ո†🪐 af†㉹r🌊 'hercai'. For example: 'hercai What is the capital of France?🛕'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Ѫﭐո꒯㉹Ֆ†-🅴🆁🆁🄾🆁\n..🌀 🌩 🌲..\nAn error occurred while processing your request\n\n contact MɆŦØU$ҤɆŁλ ₩λŁƙɆɌ My developper.', event.threadID, event.messageID);
  }
};
