import {Bot, db} from './api';

// init
const bot = new Bot;

// start
bot.start();

db.ref('/').update({'newTestAdmin2': 'newTest'});
