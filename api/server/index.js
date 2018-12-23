import Koa from 'koa';

const server = new Koa();
const PORT = process.env.PORT || 5000;

server
  .use(async ctx => {
    console.log(ctx)
    ctx.body = 'hello'
  })
  .listen(PORT, () => console.log(`Server is on ${PORT} port`));
console.log(PORT)

class Server {
  constructor() {
    this.server = server;
  }
}

export default Server;