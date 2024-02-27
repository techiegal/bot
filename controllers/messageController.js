const groupmodel = require("../model/GroupModal");
const usermodel = require("../model/userModal");
const { getBotInstance } = require("../configs/botConfig");
const bot = getBotInstance();

const handleMessage = async (msg) => {
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    const userId = msg.from.id;
    const chatId = msg.chat.id;
    const username = "@" + msg.from.username;

    try {
      const existinguserId = await usermodel.findOne({
        userId: userId,
      });
      if (!existinguserId) {
        const group_or_channel_id = [chatId];
        const newuser = new usermodel({
          userId,
          username,
          group_or_channel_id,
        });
        const saveuser = await newuser.save();
        if (saveuser) console.log("saved");
        else console.log("user not saved ");
      } else {
        if (!existinguserId.group_or_channel_id.includes(chatId)) {
          existinguserId.group_or_channel_id.push(chatId);

          const update = await usermodel.findOneAndUpdate(
            { userId: existinguserId.userId },
            existinguserId
          );
          if (update) console.log("user in other channel updated");
          else console.log("user not in channel");
        } else {
          console.log("User already associated with this chat ID.");
        }

        console.log(`user ID  already exists in database`);
      }

      const existingChatId = await groupmodel.findOne({
        groups_or_channels_id: chatId,
      });
      if (!existingChatId) {
        const newGroup = new groupmodel({ groups_or_channels_id: chatId });

        const savedGroup = await newGroup.save();
        if (savedGroup) console.log("group id saved");
        else console.log("not saved");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
};

module.exports = { handleMessage };
