import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import fs from 'fs';
import path from 'path';

// vue
import { createBundleRenderer } from 'vue-server-renderer';

const server = new Koa();
const router = new Router();
const PORT = process.env.PORT || 5000;

// vue sever renderer init
const bundle = require('../dist/vue-ssr-server-bundle.json');
const template = fs.readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template,
})


// TODO: remove console from listen method when app is finished
server
  .use(cors())
  .use(router.routes())
  .listen(PORT, () => console.log(`Server is on ${PORT} port`));

// construct server
class Server {
  constructor(database) {
    this.server = server;
    this.router = router;
    this.db = database.getDB();
  }
  serve({ endpoint, user }) {
    this.router.get(`/app/${endpoint}`, async ctx => {
      ctx.status = 200;
      const context = {
        title: 'Reminder Manager',
        url: ctx.url,
        data: user
      };
     const page = await renderer.renderToString(context);
     ctx.body = page;
    })
  }
}

export default Server;