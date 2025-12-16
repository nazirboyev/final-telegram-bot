// ================= IMPORTLAR =================
import { bot } from "../index.js";

// ================= HANDLER ===================
export default async function coursesHandler(query) {
  const chatId = query.message.chat.id;
  const data = query.data;

  // 📚 Kurslar tugmasi
  if (data === "courses") {
    return bot.sendMessage(
      chatId,
      "📚 Qaysi til kursini tanlaysiz?",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇬🇧 Ingliz tili", callback_data: "course_english" },
              { text: "🇷🇺 Rus tili", callback_data: "course_russian" },
            ],
            [
              { text: "🇫🇷 Fransuz tili", callback_data: "course_french" },
              { text: "🇩🇪 Nemis tili", callback_data: "course_german" },
            ],
            [
              { text: "⬅️ Orqaga", callback_data: "back_to_main" },
            ],
          ],
        },
      }
    );
  }

  // 🇬🇧 Ingliz tili
  if (data === "course_english") {
    return bot.sendMessage(chatId, "🇬🇧 Ingliz tili kursi tanlandi");
  }

  // 🇷🇺 Rus tili
  if (data === "course_russian") {
    return bot.sendMessage(chatId, "🇷🇺 Rus tili kursi tanlandi");
  }

  // 🇫🇷 Fransuz tili
  if (data === "course_french") {
    return bot.sendMessage(chatId, "🇫🇷 Fransuz tili kursi tanlandi");
  }

  // 🇩🇪 Nemis tili
  if (data === "course_german") {
    return bot.sendMessage(chatId, "🇩🇪 Nemis tili kursi tanlandi");
  }
}
