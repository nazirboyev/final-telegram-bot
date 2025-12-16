import mongoose from "mongoose";

// 🔽 BOT va HANDLERLAR
import "./src/bot/bot.js";

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is connected...");
  })
  .catch(() => {
    console.log("Error: db is not connected!!!");
  });



console.log("Dastur boshlanmoqda...");
