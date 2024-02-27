require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const server = express();
const url = process.env.SITE_URL;

server.use(express.json());
//database connection
require("./db/conn");
//get bot instance
const { getBotInstance } = require("./configs/botConfig");

//all imports
const { handleMessage } = require("./controllers/messageController");
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
  res.status(200).json({ message: "end point working fine" });
});

server.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`app up and running ${port}`);
});

bot.on("message", handleMessage);
bot.onText(/\/pick/, pickRandom);
bot.onText(/\/start/, Start);
bot.onText(/\/help/, Help);
bot.onText(/\/notice/, Notice);
bot.onText(/\/ban/, Ban);
bot.onText(/\/check/, Check);
