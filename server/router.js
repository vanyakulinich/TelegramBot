import Router from "koa-router";
import {
  apiMethods,
  apiEndpoints,
  closeConnectionEndpoint
} from "../config/api";

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
      console.log("server body", body);
      const { tokens, reminder } = method === "delete" ? body : body.data;
      const dataToDB = {
        tokens,
        data: reminder,
        type: endpoint,
        method
      };
      const response = await this.db.manageDataFromWebRequest(dataToDB);
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
    // close web connection endpoint
    this.router.put(closeConnectionEndpoint, async ctx => {
      this.db.closeWebConnection({ tokens: ctx.request.body });
    });
  }
}
