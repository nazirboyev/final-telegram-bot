import User from "../../models/User.js";   
import { bot } from "../bot.js";          

export default async function onStart(msg) {
  const chatId = msg.chat.id;

  // 🔎 Avval tekshiramiz
  let user = await User.findOne({ chatId });

  // ❗ Agar yo‘q bo‘lsa — yaratamiz
  if (!user) {
    await User.create({
      chatId,
      balance: 0,
      active: true,
    });
  }

  await bot.sendMessage(
    chatId,
    "👋 Assalomu alaykum!\n\n📚 Kurslar tugmasini bosing"
  );
}
