import mongoose from "mongoose";
import "./src/bot/bot.js";

mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    console.log(`DB is connected...`);
})
.catch(() => {
    console.log(`Error: db is not connected!!!`);
    
})


console.log("Dastur boshlanmoqda...");