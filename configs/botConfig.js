const TelegramBot = require("node-telegram-bot-api");

let botInstance;

// Function to get the bot instance
const getBotInstance = () => {
  if (!botInstance) {
    if (process.env.NODE_ENV === "production") {
      botInstance = new TelegramBot(process.env.BOT_TOKEN, {});
    } else {
      botInstance = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
      console.log("bot running on development");
    }
  }
  return botInstance;
};

module.exports = { getBotInstance };
