import { Bot, Database } from "./api";
import Server from "./server";

const database = new Database();
const bot = new Bot(database);
const server = new Server(database);

bot.start();
server.start();
