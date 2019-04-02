import { Bot, Database } from "./api";
import Server from "./server";

const DB = new Database();
const bot = new Bot(DB);
const server = new Server(DB);

bot.start();
server.start();
