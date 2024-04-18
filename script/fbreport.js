const axios = require('axios');

module.exports.config = {
  name: "fbreport",
  aliases: ["report"],
  version: "1.0",
  role: 2,
  hasPrefix: false,
  credits: "cliff",
  description: "Report a Facebook account",
  usage: "report [token] [uid] [amount]",
  cooldown: 6
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 3) {
      api.sendMessage('Invalid number of arguments. Usage: !fbreport [token or cookie] [user_id] [amount]', event.threadID);
      return;
    }

    const accessToken = args[0];
    const userId = args[1];
    const reportAmount = parseInt(args[2]);

    if (isNaN(reportAmount) || reportAmount <= 0) {
      api.sendMessage('Invalid report amount. Please provide a valid positive number.', event.threadID);
      return;
    }

    const apiVersion = 'v12.0'; 
    const timeInterval = 1500;
    const deleteAfter = 60 * 60;

    let reportedCount = 0;
    let timer = null;

    async function reportAccount() {
      try {
        const response = await axios.post(
          `https://graph.facebook.com/${apiVersion}/${userId}/reports`,
          {
            access_token: accessToken,
            report_type: 'fake_account',
          }
        );

        reportedCount++;
        console.log(`Account reported: ${reportedCount}`);

        if (reportedCount === reportAmount) {
          clearInterval(timer);
          console.log('Finished reporting accounts.');
          api.sendMessage('DONE REPORTING', event.threadID);
        }
      } catch (error) {
        console.error('Failed to report account:', error.response ? error.response.data : error.message);
      }
    }

    timer = setInterval(reportAccount, timeInterval);

    setTimeout(() => {
      clearInterval(timer);
      console.log('Reporting loop stopped.');
    }, reportAmount * timeInterval);
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('An error occurred: ' + error.message, event.threadID);
  }
};