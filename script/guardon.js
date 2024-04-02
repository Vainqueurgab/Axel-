const axios = require('axios');

module.exports.config = {
  name: 'profileguard',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'RyoDev',
  description: 'Enable Profile Guard Beta',
  commandCategory: 'utility',
  usages: 'profileguard [id | token]',
  cooldowns: 5,
  usePrefix: true
};

module.exports.run = async function ({ api, event, args }) {
  try {
    if (!args[0]) {
      return api.sendMessage({ body: 'Please provide an ID or token.' }, event.threadID, event.messageID);
    }

    const input = args[0].split('|').map(item => item.trim());

    if (input.length !== 2) {
      return api.sendMessage({ body: 'Invalid format. Please provide both ID and token separated by "|".' }, event.threadID, event.messageID);
    }

    const id = input[0];
    const token = input[1];

    const response = await axios.post('https://ryodevprofileguard-on.replit.app/guard', {
      token: token,
      id: id
    });

    const data = response.data;

    if (data && data.success) {
      const successMessage = `Profile Guard Beta has been enabled successfully for ID: ${id} with token: ${token}.`;
      return api.sendMessage({ body: successMessage }, event.threadID, event.messageID);
    } else if (data && data.error) {
      return api.sendMessage({ body: `Failed to enable Profile Guard Beta. Error: ${data.error}` }, event.threadID, event.messageID);
    } else {
      return api.sendMessage({ body: 'Failed to enable Profile Guard Beta. Unknown error occurred.' }, event.threadID, event.messageID);
    }
  } catch (error) {
    return api.sendMessage({ body: 'Error: ' + error.message }, event.threadID, event.messageID);
  }
};