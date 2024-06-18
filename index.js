const { spawn } = require("child_process");
const path = require('path');

const SCRIPT_FILE = "auto.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);


function start() {
    const main = spawn("node", [SCRIPT_PATH], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    main.on("close", (exitCode) => {
        if (exitCode === 0) {
            console.log("𝖬𝖺𝗂𝗇🎲 𝗉𝗋𝗈𝖼𝖾𝗌𝗌🎯 𝖾𝗑𝗂𝗍𝖾𝖽🎲 𝗐𝗂𝗍𝗁♣ 𝖼𝗈𝖽𝖾🎧 0");
        } else if (exitCode === 1) {
            console.log("𝖬𝖺𝗂𝗇🤬 𝗉𝗋o𝖼𝖾𝗌𝗌🗯 𝖾𝗑𝗂𝗍𝖾𝖽♣ 𝗐𝗂𝗍𝗁🍵 𝖼𝗈𝖽𝖾🍫 1. 𝖱𝖾𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀🍹...");
            start();
        }  else {
            console.error(`𝖬𝖺𝗂𝗇🎖 𝗉𝗋𝗈𝖼𝖾𝗌𝗌🥉 𝖾𝗑𝗂𝗍𝖾𝖽🎂 𝗐𝗂𝗍𝗁🍫 𝖼𝗈𝖽𝖾🎒 ${exitCode}`);
        }
    });
}

start();
