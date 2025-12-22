// stats.js
import User from "./src/models/User.js";

export default function statsHandler(bot) {
  const ADMIN_ID = Number(process.env.ADMIN_ID);

  bot.onText(/\/stats/, async (msg) => {
    if (msg.chat.id !== ADMIN_ID) return;

    const count = await User.countDocuments();
    bot.sendMessage(msg.chat.id, `📊 Botda ${count} ta user bor`);
  });
}
