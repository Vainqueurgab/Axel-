module.exports = {
  config: {
    name: "command",
    aliases: ["cmd"],
    description: "Command Module Deployment",
    author: "Liane",
    usage: ":cmd [load|loadall] <file>",
    license: "ISC",
  },

  run: async ({ box, event, args }) => {
    try {
      const { load, loadAll } = global.yue;

      switch (args[0]) {
        case "load":
          if (args[1]) {
            await load(args[1]);
            box.reply("✅ Successfully loaded the command module");
          } else {
            box.reply("❌ Missing module name. Please provide the module name to load.");
          }
          break;

        case "loadAll":
          await loadAll();
          box.reply("✅ Successfully loaded all command modules");
          break;

        default:
          box.reply("❌ Invalid command. Use :cmd [load|loadall] <file> to manage command modules.");
      }
    } catch (error) {
      box.reply(`❌ An error occurred: ${error.message}`);
    }
  },
};
