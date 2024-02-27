const groupmodel = require("../model/GroupModal");
const usermodel = require("../model/userModal");
const { getBot, getBotInstance } = require("../configs/botConfig");

const bot = getBotInstance();

const pickRandom = async (msg) => {
  try {
    const data = await bot.getChatAdministrators(msg.chat.id);
    const adminIds = data
      .filter((admin) => !admin.user.is_bot)
      .map((admin) => admin.user.id);
    const chatId = msg.chat.id;

    if (adminIds.includes(msg.from.id)) {
      const fetchUsers = await usermodel.find();
      const randomIndex = Math.floor(Math.random() * fetchUsers.length);
      const randomUser = fetchUsers[randomIndex];
      bot.sendMessage(
        msg.chat.id,
        `Randomly picked user: ${randomUser.username}`
      );
    } else {
      const sentMessage = await bot.sendMessage(
        msg.chat.id,
        "only admins can  use this command."
      );

      setTimeout(() => {
        bot.deleteMessage(sentMessage.chat.id, sentMessage.message_id);
      }, 10000);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    bot.sendMessage(
      msg.chat.id,
      "An error occurred while processing your request."
    );
  }
};

module.exports = { pickRandom };
