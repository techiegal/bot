require("dotenv").config();

const express = require("express");
const port = process.env.port || 3000;
const server = express();

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

server.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.status(200).json({ message: "ok" });
});

bot.on("message", handleMessage);
bot.on("message", check);
bot.onText(/\/pick/, pickRandom);
bot.onText(/\/start/, Start);
bot.onText(/\/help/, Help);
bot.onText(/\/notice/, Notice);
bot.onText(/\/ban/, Ban);
bot.onText(/\/check/, Check);
