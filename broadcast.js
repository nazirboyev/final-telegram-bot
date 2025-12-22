import User from "./src/models/User.js";

export default function broadcastHandler(bot) {
  const ADMIN_ID = Number(process.env.ADMIN_ID);

  bot.onText(/\/broadcast/, async (msg) => {
    const chatId = msg.chat.id;

    if (chatId !== ADMIN_ID) {
      return bot.sendMessage(chatId, "❌ Siz admin emassiz!");
    }

    bot.sendMessage(chatId, "✍️ Yuboriladigan xabarni yozing:");

    bot.once("message", async (message) => {
      if (message.chat.id !== ADMIN_ID) return;

      const users = await User.find();
      console.log("📊 USERLAR SONI:", users.length);

      let sent = 0;

      for (const user of users) {
        try {
          await bot.sendMessage(user.chatId, message.text);
          sent++;
        } catch {}
      }

      bot.sendMessage(
        chatId,
        `✅ Broadcast tugadi!\n\n👥 Userlar: ${users.length}\n📨 Yuborildi: ${sent}`
      );
    });
  });
}
