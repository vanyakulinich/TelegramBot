import Promise from 'bluebird';
import TelegramBot from 'node-telegram-bot-api';
import { BOT_KEY } from '../config/bot';
import { messages } from '../../helpers/botHelpers';
Promise.config({
  cancellation: true
});


export default class Bot {
  constructor(database) {
    this.bot = new TelegramBot(BOT_KEY, { polling: true});
    this.db = database;
  }
  getId(msg) { 
    return msg.chat.id; 
  }
  // TODO: implement database integration
  start() {
    // bot start chat
    this.bot.onText(/\/start/, msg => this.bot.sendMessage(this.getId(msg), messages.start));
    // bot help
    this.bot.onText(/\/help|help/, msg => this.bot.sendMessage(this.getId(msg), messages.help));

    // TODO: implement crud methods

    // web link 
    this.bot.onText(/Link|link/, msg => {
      const link = `http://www.localhost:5000/vue-app/` // TODO: implement personal link
      this.bot.sendMessage(this.getId(msg), `[Your personal page link](${link})`, { parse_mode: 'Markdown' });
    });
  }

    // will be used for future bot functionality
    //  

    // this.bot.onText(/(.+)/, (msg, match) => {
    //   const { id } = msg.chat;
    //   console.log(msg)
    //   // const opts = {
    //   //   // reply_to_message_id: msg.message_id,
    //   //   reply_markup: {
    //   //     inline_keyboard: [
    //   //       [
    //   //         {
    //   //           text: 'Event',
    //   //           callback_data: 'type_event'
    //   //         },
    //   //         {
    //   //           text: 'Birthday',
    //   //           callback_data: 'type_birthday'
    //   //         },
    //   //         {
    //   //           text: 'ToDo',
    //   //           callback_data: 'type_todo'
    //   //         },
    //   //       ]
    //   //     ]
    //   //   }
    //   // };
    //   // this.bot.sendMessage(id, 'Select reminder type: ', opts);
    //   // console.log(match[1])
    // })
    // this.bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    //   console.log(callbackQuery)
    //   const self = this;
    //   const action = callbackQuery.data;
    //   // console.log(callbackQuery)
    //   const msg = callbackQuery.message;

    //   const opts = {
    //     chat_id: msg.chat.id,
    //     message_id: msg.message_id,
    //   };
    //   const text = `You selected ${action.split('_')[1]} reminder type. Now enter reminder, date and time`;
    //   self.editMessageText(text, opts);
    //   self.sendMessage(msg.chat.id, 'choose date', {
    //     // reply_to_message_id: msg.message_id,
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: 'Event',
    //             callback_data: 'type_event'
    //           },
    //           {
    //             text: 'Birthday',
    //             callback_data: 'type_birthday'
    //           },
    //           {
    //             text: 'ToDo',
    //             callback_data: 'type_todo'
    //           },
    //         ]
    //       ]
    //     }
    //   })
    
    //   // if (action === 'type_event') {
    //   //   text = 'you selected event';
    //   //   // console.log(this)
    //   //   self.editMessageText(text, opts);
        
    //   //   // self.deleteMessage(msg.chat.id, msg.message_id)
    //   //   // self.sendMessage(msg.chat.id, text)
    //   // }
    

    // })
}

