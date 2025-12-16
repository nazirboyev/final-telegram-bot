import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handlers/onStart.js";

config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

// 🔴 KANAL USERNAME (bot admin bo‘lishi shart)
const CHANNEL_ID = "@nazirboyevvvvv";

// ================== OBUNANI TEKSHIRISH ==================
const checkIfUserSubscribed = async (chatId) => {
  try {
    const member = await bot.getChatMember(CHANNEL_ID, chatId);

    if (member.status === "left" || member.status === "kicked") {
      return false;
    }
    return true;
  } catch (err) {
    console.log("SUBSCRIBE CHECK ERROR:", err.message);
    return false;
  }
};

// ================== MAJBURIY OBUNA XABARI ==================
const sendSubscribeMessage = (chatId, firstname) => {
  return bot.sendMessage(
    chatId,
    `Hurmatli ${firstname} 👋\n\nBotdan foydalanish uchun quyidagi kanalga obuna bo‘ling 👇`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📢 Kanalga obuna bo‘lish",
              url: "https://t.me/nazirboyevvvvv",
            },
          ],
          [
            {
              text: "✅ Obunani tekshirish",
              callback_data: "confirm_subscription",
            },
          ],
        ],
      },
    }
  );
};

// ================== MESSAGE HANDLER ==================
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name || "Do‘st";
  const text = msg.text;

  const isSubscribed = await checkIfUserSubscribed(chatId);

  // 🔒 Agar obuna bo‘lmagan bo‘lsa — blok
  if (!isSubscribed) {
    return sendSubscribeMessage(chatId, firstname);
  }

  // /start
  if (text === "/start") {
    return onStart(msg);
  }

  

  // oddiy javob
  bot.sendMessage(chatId, `Assalomu alaykum, ${firstname}`);
});

// ================== CALLBACK HANDLER ==================
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const firstname = query.message.chat.first_name || "Do‘st";
  const messageId = query.message.message_id;

  if (query.data === "confirm_subscription") {
    const isSubscribed = await checkIfUserSubscribed(chatId);

    if (!isSubscribed) {
      return bot.answerCallbackQuery(query.id, {
        text: "❌ Siz hali kanalga obuna bo‘lmagansiz",
        show_alert: true,
      });
    }

    // obuna bo‘lgan bo‘lsa
    await bot.deleteMessage(chatId, messageId);
    await bot.answerCallbackQuery(query.id, {
      text: "✅ Obuna tasdiqlandi",
    });

    return onStart(query.message);
  }
});

console.log("🤖 Bot ishga tushdi...");
