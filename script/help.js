module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `  ㋛.𝙰ｖ𝚊ｌ𝚊ｂｌ𝚎  𝚌𝚖ｄ:\n━━━━━━━━━━━━━━━\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ⋆⋆⁺₊✧🎀 ${prefix}${commands[i]} ✩ ₊🌱\n`;
      }
      helpMessage += '\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ♣✩ ⚽ ₊ ${prefix}${eventCommand} ⋆🎯⋆⁺₊🌱\n`;
      });
      helpMessage += `\n𝐏𝐀𝐆𝐄 ${page}/${Math.ceil(commands.length / pages)}. 𝗧𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗡𝗲𝘅𝘁🤬 𝗣𝗮𝗴𝗲, 𝗧𝘆𝗽𝗲 '${prefix}𝗵𝗲𝗹𝗽 𝗽𝗮𝗴𝗲🎮 𝗡𝘂𝗺𝗯𝗲𝗿'. 𝗧𝗼 𝗩𝗶𝗲𝘄 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻🥉 𝗔𝗯𝗼𝘂𝘁 𝗮 𝗦𝗽𝗲𝗰𝗶𝗳𝗶𝗰 𝗖𝗼𝗺𝗺𝗮𝗻𝗱, 𝗧𝘆𝗽𝗲. '${prefix}𝗛𝗲𝗹𝗽 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗡𝗮𝗺𝗲⚽ 🎖`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `𝚊ｖ𝚊ｌ𝚊ｂｌ𝚎 𝚌𝚖ｄ🥢\n━━━━━━━━━━━━━━━\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ⋆⋆⁺₊✧🎀 ${prefix}${commands[i]} ➪✩🏏 ₊\n`;
      }
      helpMessage += '\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}.✩⚽ ₊𒊹${prefix}${eventCommand} ⋆🏆⋆⁺₊✧☘\n`;
      });
      helpMessage += `\n𝗣𝗮𝗴𝗲 ${page} 𝗢𝗳 ${Math.ceil(commands.length / pages)}\n𝗕𝘁𝘄 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 𝘆𝗼𝘂𝗿 𝗼𝘄𝗻 𝗯𝗼𝘁➪➪ ♧ \n➪ https://another-gpt.onrender.com`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';
        const message = ` 「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '🎀𝖲𝗒𝗌𝗍𝖾𝗆𝗌 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌:🎲\nY🎀𝗈𝗎𝗋 𝖼𝗁𝖺𝗍𝖻𝗈𝗍 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌: ' + prefix : "🎀Ａｎｏｔｈｅｒ.\n━━━━━━━━━━━━━━━\nSorry i don't have prefix";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
 
