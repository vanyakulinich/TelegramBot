import Router from "koa-router";
import { apiMethods, apiEndpoints, closeConnectionEndpoint } from "./config";

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
      const { tokens, payload } = method === "delete" ? body : body.data;
      const dataToDB = {
        tokens,
        data: payload,
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
    this.router.delete(closeConnectionEndpoint, ctx => {
      this.db.closeWebConnection({ tokens: ctx.request.body });
    });
  }
}
