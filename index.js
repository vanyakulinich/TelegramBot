import {Bot, db } from './api';
import Server from './server';

// init
const bot = new Bot(db);
const server = new Server(db);

// start
bot.start(server);
