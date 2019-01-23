import { Bot, Database } from "./api";
import Server from "./server";

// init
const database = new Database();
const bot = new Bot(database);
const server = new Server(database);

// start
bot.start();
server.start();
