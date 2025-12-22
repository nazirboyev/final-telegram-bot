import TelegramBot from "node-telegram-bot-api";
import Application from "../models/Application.js";
import onStart from "./handlers/onStart.js";
import dotenv from "dotenv";
dotenv.config();



// ❗ TOKEN TEKSHIRISH
if (!process.env.BOT_TOKEN) {
  throw new Error("❌ BOT_TOKEN topilmadi (.env ni tekshir)");
}

export const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const CHANNEL_ID = "@nazirboyevvvvv";
const ADMIN_ID = process.env.ADMIN_ID;

const userState = {};

// 🔐 Obuna tekshirish
const checkIfUserSubscribed = async (chatId) => {
  try {
    const member = await bot.getChatMember(CHANNEL_ID, chatId);
    return member.status !== "left" && member.status !== "kicked";
  } catch {
    return false;
  }
};

const sendSubscribeMessage = (chatId, firstname) => {
  return bot.sendMessage(
    chatId,
    `Hurmatli ${firstname} 👋\n\nBotdan foydalanish uchun kanalga obuna bo‘ling 👇`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📢 Kanalga obuna bo‘lish",
              url: "https://t.me/nazirboyevvvvv",
            },
          ],
          [{ text: "✅ Obunani tekshirish", callback_data: "confirm_sub" }],
        ],
      },
    }
  );
};

// 📩 Xabarlar
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstname = msg.chat.first_name || "Do‘st";

  if (!(await checkIfUserSubscribed(chatId))) {
    return sendSubscribeMessage(chatId, firstname);
  }

  if (text === "/start") return onStart(msg);

  if (userState[chatId]?.step === "fio") {
    const { course } = userState[chatId];

    await Application.create({
      userId: chatId,
      username: msg.chat.username || "-",
      fio: text,
      course,
    });

    await bot.sendMessage(chatId, `✅ Qabul qilindingiz!\n\n👤 ${text}\n📚 ${course}`);
    await bot.sendMessage(
      ADMIN_ID,
      `🆕 Yangi ariza\n👤 ${text}\n📚 ${course}\n🆔 ${chatId}`
    );

    delete userState[chatId];
  }
});

// 🔘 Tugmalar
bot.on("callback_query", async (q) => {
  const chatId = q.message.chat.id;

  if (q.data === "confirm_sub") {
    await q.answerCallbackQuery();
    return onStart(q.message);
  }

  if (q.data === "JOIN") {
    return bot.sendMessage(chatId, "Kursni tanlang:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "💻 Dasturlash", callback_data: "C_D" }],
          [{ text: "📐 Matematika", callback_data: "C_M" }],
          [{ text: "🇬🇧 Ingliz tili", callback_data: "C_E" }],
        ],
      },
    });
  }

  if (q.data.startsWith("C_")) {
    const map = {
      C_D: "Dasturlash",
      C_M: "Matematika",
      C_E: "Ingliz tili",
    };

    userState[chatId] = { step: "fio", course: map[q.data] };
    return bot.sendMessage(chatId, "✍️ F.I.O kiriting:");
  }
});

console.log("🤖 Bot ishga tushdi");

console.log("TOKEN:", process.env.BOT_TOKEN);