import Koa from "koa";
import cors from "@koa/cors";
import { Nuxt, Builder } from "nuxt";
import bodyParser from "koa-bodyparser";
import nuxtConfig from "../nuxt.config";
import { parseToken } from "../helpers/serverHelpers";
import { ApiRouter } from "./router";

export default class Server {
  constructor(database) {
    this.server = new Koa();
    this.nuxt = new Nuxt(nuxtConfig);
    this.db = database.DB;
    this.router = new ApiRouter(this.db).getRouter();
  }

  start() {
    nuxtConfig.dev = !(this.server.dev === "production");
    const { port = process.env.PORT || 3000 } = this.nuxt.options.server;
    if (nuxtConfig.dev) new Builder(this.nuxt).build();
    this.server
      .use(cors())
      .use(bodyParser())
      .use(this.router.routes())
      .use(this.router.allowedMethods())
      .use(async ctx => {
        ctx.status = 200;
        const token = parseToken(ctx.request.path);
        const initData = token
          ? await this.db.getInitUserDataForWebApp(token)
          : null;
        ctx.req.initData = initData ? { ...initData } : null;
        return new Promise((resolve, reject) => {
          ctx.res.on("close", resolve);
          ctx.res.on("finish", resolve);
          this.nuxt.render(ctx.req, ctx.res, promise => {
            promise.then(resolve).catch(reject);
          });
        });
      })
      .listen(port);
  }
}
