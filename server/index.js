import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import Router from 'koa-router';
import cors from 'koa2-cors';
import fs from 'fs';
import path from 'path';
import { checkRoute } from '../helpers/serverHelpers';

// vue
import { createBundleRenderer } from 'vue-server-renderer';

const server = new Koa();
const router = new Router({
  prefix: '/app'
});
const PORT = process.env.PORT || 5000;

// vue sever renderer init
const bundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  clientManifest,
  template,
})

// TODO: remove console from listen method when app is finished
server
  .use(mount("/dist", serve("./dist")))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => console.log(`Server is on ${PORT} port`));

// construct server
class Server {
  constructor(database) {
    this.server = server;
    this.router = router;
    this.db = database.getDB();
  }
  serve(token, user) {
    this.router.get(`/:token/:path`, async ctx => {
      const validPath = checkRoute(ctx.request.path);
      if(validPath && token === validPath[2]) {
        ctx.status = 200;
        const context = {
          title: 'Reminder Manager',
          url: ctx.url,
          data: user,
        };
       const page = await renderer.renderToString(context);
       ctx.body = page;
      } else {
        ctx.status = 404;
      }
    })
  }
}

export default Server;