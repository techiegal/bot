require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const server = express();
const url = process.env.SITE_URL;

server.use(express.json());
//database connection
require("./db/conn");

const { getBotInstance } = require("./configs/botConfig");

//all imports
const { handleMessage, check } = require("./controllers/messageController");
const { pickRandom } = require("./controllers/extraFunctions");
const {
  Start,
  Help,
  Ban,
  Notice,
  Check,
} = require("./controllers/commandHandlers");

const bot = getBotInstance();

server.get("/", (req, res) => {
  res.status(200).json({ message: "end point working fine bro" });
});

server.post(`/{process.env.BOT_TOKEN}`, (req, res) => {
  console.log(req.body);
  bot.processUpdate(req.body);
  res.status(200).json({ message: "ok" });
});

server.listen(port, () => {
  console.log(`app up and running ${port}`);
});

bot.on("message", handleMessage);
bot.on("message", check);
bot.onText(/\/pick/, pickRandom);
bot.onText(/\/start/, Start);
bot.onText(/\/help/, Help);
bot.onText(/\/notice/, Notice);
bot.onText(/\/ban/, Ban);
bot.onText(/\/check/, Check);
