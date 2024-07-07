const axios = require('axios');

module.exports = {
  name: 'gpt4o',
  description: 'Ask a question and get a response from GPT-4',
  usage: '<question>',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (args.length === 0) {
        api.sendMessage(`
𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗨𝗦𝗔𝗚𝗘:

➥ *${prefix}gpt4o <question>* -> Get an answer from GPT-4.

*Example:*
➥ ${prefix}ask What is the capital of France?

Have fun using it, enjoy! ❤️
Bot Developer: joshua Apostol
        `, event.threadID);
        return;
      }

      const question = encodeURIComponent(args.join(' '));
      const apiUrl = `https://nash-rest-api.replit.app/freegpt4o8k?question=${question}`;

      api.sendMessage('🤖 Please wait, GPT-4 is thinking...', event.threadID);

      axios.get(apiUrl)
        .then(response => {
          const answerData = JSON.parse(response.data.answer);

          if (answerData && answerData.response) {
            const gptResponse = `
𝗦𝗢𝗠𝗘 𝗔𝗡𝗦𝗪𝗘𝗥𝗦 𝗙𝗥𝗢𝗠 𝗚𝗣𝗧-𝟰:

➥ 💬Question: ${args.join(' ')}
━━━━━━━━━━━━━━━━━━━
➥ 🔍Answer: ${answerData.response.replace('Is this answer helpful to you?', '').trim()}
━━━━━━━━━━━━━━━━━━━

Have fun using it, enjoy! ❤️
Bot Developer: joshua apostol
            `;

            api.sendMessage(gptResponse, event.threadID);
          } else {
            api.sendMessage('🤖 No response received from GPT-4.', event.threadID);
          }
        })
        .catch(error => {
          console.error('Error fetching GPT-4 response:', error.message || error);
          api.sendMessage('An error occurred while fetching GPT-4 response.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error.message || error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};
