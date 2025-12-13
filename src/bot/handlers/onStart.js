import { bot } from "../bot.js";

const onStart = async (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
};
if (text == "📚 Fanlar") {
  bot.sendMessage(
    chatId,
    `🎓 Bizning o'quv markazimizda quyidagi fanlar mavjud:
    1️⃣ Ingliz tili  
    2️⃣ Rus tili  
    3️⃣ Turk tili
    4️⃣ Nemis tili 
    👇 Quyidagi fanlardan birini tanlang va batafsil ma’lumot oling:`,
            {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇬🇧 Ingliz tili", callback_data: "course_english" }],
            [{ text: "🇷🇺 Rus tili", callback_data: "course_russia" }],
            [{ text: "➕ Matematika", callback_data: "course_math" }],
            [{ text: "🖥 Informatika", callback_data: "course_informatics" }],
            [{ text: "🇺🇿 Ona tili", callback_data: "course_uzbek" }],
          ],
        },
      }

  )
}

export default onStart;