const groupmodel = require("../model/GroupModal");
const usermodel = require("../model/userModal");
const { getBotInstance } = require("../configs/botConfig");
const TelegramBot = require("node-telegram-bot-api");

// const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const bot = getBotInstance();

const Start = async (msg) => {
  if (msg.chat.type === "private") {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `Hey you im random user picker bot built using node js
            <b>developer:@immouni</b>
        
        `
    );
  }
};

const Help = async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Available commands:\n/start - Start the bot\n/help - Display available commands"
  );
};

const Notice = async (msg) => {
  const message = msg.text.split("/notice ")[1];
  if (msg.chat.type === "private" && msg.from.username === "immouni") {
    const data = await groupmodel.find({});
    data.forEach((data, index) => {
      bot.sendMessage(data.groups_or_channels_id, message);
    });
  }
};

const Ban = async (msg) => {
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    bot.banChatMember(msg.chat.id, msg.reply_to_message.from.id);

    console.log("user banned");
  }
};

const Check = async (msg) => {
  if (!msg.chat.type === "group" || msg.chat.type === "supergroup")
    return bot.sendMessage(msg.chat.id, "Command not found");
  const fromUsername = msg.from.username;
  const username = msg.from.first_name;
  const chatId = msg.chat.id;
  const tag = fromUsername ? `@${fromUsername}` : `\`${username}\``;

  try {
    await bot.sendMessage(chatId, `Hello ${tag} I'm Live`, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = { Start, Help, Notice, Ban, Check };
