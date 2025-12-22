// index.js
import { config } from "dotenv";
import mongoose from "mongoose";
import { bot } from "./src/bot/bot.js";

import onStart from "./src/bot/handlers/onStart.js";
import broadcastHandler from "./broadcast.js";
import statsHandler from "./stats.js";

// 1️⃣ .env ni eng boshida yuklaymiz
config();

// 2️⃣ Handlerlarni ulaymiz
bot.onText(/\/start/, onStart);
broadcastHandler(bot);
statsHandler(bot);

// 3️⃣ MongoDB ulash
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB ulandi"))
  .catch(() => console.log("🔴 MongoDB ulanmadi"));

console.log("🚀 Dastur ishga tushdi");

