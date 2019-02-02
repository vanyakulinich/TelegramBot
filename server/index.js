import Koa from "koa";
import { Nuxt, Builder } from "nuxt";
import bodyParser from "koa-bodyparser";
import nuxtConfig from "../nuxt.config";
import { parseToken } from "../helpers/serverHelpers";
import { ApiRouter } from "./router";

export default class Server {
  constructor(database) {
    this.server = new Koa();
    this.router = new ApiRouter(database).getRouter();
    this.nuxt = new Nuxt(nuxtConfig);
    this.db = database.getDB();
  }

  start() {
    nuxtConfig.dev = !(this.server.dev === "production");
    const { port = process.env.PORT || 3000 } = this.nuxt.options.server;

    if (nuxtConfig.dev) new Builder(this.nuxt).build();
    this.server
      .use(bodyParser())
      .use(this.router.routes())
      .use(this.router.allowedMethods())
      .use(async ctx => {
        const token = parseToken(ctx.request.path);
        const initData = token
          ? await this.db.getInitUserDataForWebApp(token)
          : null;
        ctx.status = initData ? 200 : 404;
        ctx.req.initData = { ...initData };
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
