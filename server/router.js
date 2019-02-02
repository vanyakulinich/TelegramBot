import Router from "koa-router";

export class ApiRouter {
  constructor(db) {
    this.router = new Router({
      prefix: "/api"
    });
    this.methods = ["post", "put", "delete"];
    this.endpoints = ["reminder", "personal"];
    this.db = db;
  }

  _createRoute({ endpoint, method, databaseCB }) {
    this.router[method](`/${endpoint}`, async ctx => {
      ctx.status = 200;
      const { body } = ctx.request;
      const response = await databaseCB({ ...body, type: endpoint });
      ctx.body = response;
    });
  }

  _createEndpointRoutes(endpoint) {
    this.methods.forEach(method => {
      this._createRoute({
        endpoint,
        method,
        databaseCB: this.db.manageDataFromWebRequest
      });
    });
  }

  getRouter() {
    this.initRoutes();
    return this.router;
  }

  initRoutes() {
    this.endpoints.forEach(endpoint => this._createEndpointRoutes(endpoint));
  }
}
