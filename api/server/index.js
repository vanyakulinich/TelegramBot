import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';

// vue
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
const renderer = createRenderer();

const server = new Koa();
const router = new Router();
const PORT = process.env.PORT || 5000;

server
  .use(cors())
  .use(router.routes())
  .listen(PORT, () => console.log(`Server is on ${PORT} port`));
console.log(PORT)

class Server {
  constructor() {
    this.server = server;
    this.router = router;
  }
  start() {
    this.router.get('/vue-app', async ctx => {
      ctx.status = 200;
      const url = ctx.request.url;
      console.log(url)
      const vueApp = new Vue({
        data: {
          url
        },
        template: `<h1>the path is {{url}}. it works</h1>`
      });

      renderer.renderToString(vueApp, (err, html) => {
        if (err) throw new Error(err)
        ctx.body = `<div>${html}</div>`
      })
    })
  }
}

export default Server;