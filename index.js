import {Bot, db } from './api';
import Server from './server/index';

// init
const bot = new Bot(db);
const server = new Server();
// start
bot.start();
server.start();

// db.ref('/').update({'newTestAdmin3': 'newTest'});
