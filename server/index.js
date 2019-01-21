import Koa from 'koa';
import Router from 'koa-router';
import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../nuxt.config';
import { checkRoute } from '../helpers/serverHelpers';

const server = new Koa();
const router = new Router({
  // prefix: '/app',
});
nuxtConfig.dev = !(server.env === 'production')


const nuxt = new Nuxt(nuxtConfig);
const {
  host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || 5000
} = nuxt.options.server
console.log(nuxt.options.server)
// Build in development
if (nuxtConfig.dev) {
  console.log('builder')
  const builder = new Builder(nuxt)
  builder.build()
}

server
  .use(async ctx => {
    ctx.status = 200;
    const validPath = checkRoute(ctx.request.path);
      console.log(validPath)
    return new Promise((resolve, reject) => {
      ctx.req.user = {testUser: 'testData'};
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  }) 
  .listen(port, () => console.log(`Server is on ${port} port`));


// app.listen(port);
// console.log('Server listening on :' + port);

// new Builder(nuxt).build();

// TODO: remove console from listen method when app is finished
// server
  // .use(mount("/public", serve("../public")))
  // .use(router.routes())
  // .use(router.allowedMethods())
  // .use(async ctx => {
  //   ctx.status = 200;
  //   nuxt.render(ctx.req, ctx.res)
  //     return new Promise((resolve, reject) => {
  //       ctx.req.user = {data: 'from server'};
  //       ctx.res.on('close', resolve)
  //       ctx.res.on('finish', resolve)
  //       nuxt.render(ctx.req, ctx.res, promise => {
  //         promise.then(resolve).catch(reject)
  //       })
  //     })
  //     // ctx.body = 'ok'
  // })
  // .listen(port, () => console.log(`Server is on ${port} port`));

  // router.get(`/`, async ctx => {
  //   ctx.status = 200;
  //   return new Promise((resolve, reject) => {
  //     ctx.req.user = {test: 'from server'};
  //     ctx.res.on('close', resolve)
  //     ctx.res.on('finish', resolve)
  //     nuxt.render(ctx.req, ctx.res, promise => {
  //       promise.then(resolve).catch(reject)
  //     })
  //   })
  // })

// construct server
class Server {
  constructor(database) {
    this.server = server;
    this.router = router;
    this.db = database.getDB();
  }
}

export default Server;