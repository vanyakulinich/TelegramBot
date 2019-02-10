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
      const { body, params } = ctx.request;
      const response = await this.db.manageDataFromWebRequest({
        ...body,
        type: endpoint
      });
      console.log(response);
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
