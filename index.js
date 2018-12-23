import {Bot, db, Server} from './api';

// init
const bot = new Bot;
const server = new Server();
// start
bot.start();
server.start();

db.ref('/').update({'newTestAdmin2': 'newTest'});
