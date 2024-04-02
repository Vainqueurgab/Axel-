const os = require('os');
const pidusage = require('pidusage');

module.exports.config = {
		name: "up",
		version: "1.0.2",
		role: 0,
		credits: "Kyle",
		description: "uptime",
		hasPrefix: true,
		cooldowns: 5,
		aliases: ["up"]
};

function byte2mb(bytes) {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0, n = parseInt(bytes, 10) || 0;
		while (n >= 1024 && ++l) n = n / 1024;
		return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);
		const cores = `Cores: ${os.cpus().length}`;

		return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
}

module.exports.run = async ({ api, event }) => {
		const time = process.uptime();
		const hours = Math.floor(time / (60 * 60));
		const minutes = Math.floor((time % (60 * 60)) / 60);
		const seconds = Math.floor(time % 60);

		const usage = await pidusage(process.pid);

		const osInfo = {
				platform: os.platform(),
				architecture: os.arch()
		};

		const timeStart = Date.now();
		const returnResult = ` ━━━━━━━━━━━━━━━━━━━\n🟢 𝗕𝗢𝗧 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝘄𝗼𝗿𝗸𝗶𝗻𝗴  𝗳𝗼𝗿 ${hours} 𝗵𝗼𝘂𝗿(s) ${minutes} 𝗺𝗶𝗻𝘂𝘁𝗲(s) ${seconds} 𝘀𝗲𝗰𝗼𝗻𝗱(s).\n\n💽 𝗖𝗽𝘂 𝘂𝘀𝗮𝗴𝗲: ${usage.cpu.toFixed(1)}%\n💾 𝗥𝗔𝗠 𝘂𝘀𝗮𝗴𝗲: ${byte2mb(usage.memory)}\n📡 𝗖𝗼𝗿𝗲𝘀: ${os.cpus().length}\n📶 𝗣𝗶𝗻𝗴: ${Date.now() - timeStart}ms\n⚙️ 𝗢𝗽𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝗦𝘆𝘀𝘁𝗲𝗺 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: ${osInfo.platform}\n⚙️ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗖𝗣𝗨 𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲: ${osInfo.architecture}\n ━━━━━━━━━━━━━━━━━━━\n𝗕𝗢𝗧 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥: 𝖪𝖸𝖫𝖤 𝖡𝖠𝖨𝖳-𝖨𝖳\n𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞_𝗟𝗜𝗡𝗞: https://www.facebook.com/kyleyukaro`;

		return api.sendMessage(returnResult, event.threadID, event.messageID);
};