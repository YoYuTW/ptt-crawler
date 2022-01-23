const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');
const fetchData = require('./src/fetchPTT');

const token = process.env.token;

const linkHasSent = [];
 
let job;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start$/, msg => {  
  const chatId = msg.chat.id;   
  if (chatId != process.env.chatid) {
    bot.sendMessage(chatId, `Who are you?`);
    return
  }
  bot.sendMessage(chatId, `Let's GOOOOOO`);  
  job = schedule.scheduleJob('*/1 * * * *',() => {          
    getData(chatId);
  });
});

bot.onText(/\/stop/, msg => {
  const chatId = msg.chat.id; 
  if (job) {
      job.cancel();
      bot.sendMessage(chatId, `Bye`);
  }
});

async function getData(chatId) { 
  const data = await fetchData();
  data.forEach(item => {
    if (linkHasSent.indexOf(item.link) === -1) {
      linkHasSent.push(item.link);
      const title = item.title.replaceAll(/\(|\)|\（|\）/g, "");
      console.log(title)
      bot.sendMessage(chatId, `[${title}](${item.link})`, { parse_mode: `MarkdownV2` });
    } 
  });  
}