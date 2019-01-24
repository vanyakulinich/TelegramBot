import Koa from "koa";
import Router from "koa-router";
import { Nuxt, Builder } from "nuxt";
import nuxtConfig from "../nuxt.config";
import { checkRoute } from "../helpers/serverHelpers";

export default class Server {
  constructor(database) {
    this.server = new Koa();
    this.router = new Router();
    this.nuxt = new Nuxt(nuxtConfig);
    this.db = database.getDB();
  }

  _getInitUserData() {
    // this.db
    // TODO: implement db request
  }

  start() {
    nuxtConfig.dev = !(this.server.dev === "production");
    const { port = process.env.PORT || 5000 } = this.nuxt.options.server;

    if (nuxtConfig.dev) new Builder(this.nuxt).build();
    // TODO: implement routes for db data changes from app
    this.router.get("/api", async ctx => {
      ctx.status = 200;
      ctx.body = ctx.request.path;
    });

    this.server
      .use(this.router.routes())
      .use(this.router.allowedMethods())
      .use(async ctx => {
        ctx.status = 200;
        const publicToken = checkRoute(ctx.request.path);
        if (publicToken) {
          // const initData = await this.db.getUserDataForWebApp(publicToken);
          // console.log(initData);
          // temporary mocked
          // ctx.req.initData = { ...initData };
          // TODO: if no initData, render 404 page
        }
        return new Promise((resolve, reject) => {
          ctx.res.on("close", resolve);
          ctx.res.on("finish", resolve);
          this.nuxt.render(ctx.req, ctx.res, promise => {
            promise.then(resolve).catch(reject);
          });
        });
      })
      .listen(port, () => console.log(`Server is on ${port} port`));
  }
}
