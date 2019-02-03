import Router from "koa-router";
import { apiMethods, apiEndpoints } from "../config/api";

export class ApiRouter {
  constructor(db) {
    this.router = new Router({
      prefix: "/api"
    });
    this.db = db;
  }

  _createRoute({ endpoint, method }) {
    this.router[method](`/${endpoint}`, async ctx => {
      ctx.status = 200;
      const { body } = ctx.request;
      const response = await this.db.manageDataFromWebRequest({
        ...body,
        type: endpoint
      });
      ctx.body = response;
    });
  }

  _createEndpointRoutes(endpoint) {
    apiMethods.forEach(method => {
      this._createRoute({
        endpoint,
        method
      });
    });
  }

  getRouter() {
    this.initRoutes();
    return this.router;
  }

  initRoutes() {
    Object.keys(apiEndpoints).forEach(endpoint =>
      this._createEndpointRoutes(endpoint)
    );
    // test route
    this.router.get("/", async ctx => {
      ctx.status = 200;
      ctx.body = await this.db.getUser(565484466);
    });
    this.router.post("/", async ctx => {
      ctx.status = 200;
      console.log("END");
    });
  }
}
