import { Router } from "express";
import registerUserRouter from "./users/registerUserRouter";
import loginUserRouter from "./users/loginUserRouter";
import currentUserRouter from "./users/currentUserRouter";

class MasterRouter {
  private _router = Router();
  private _loginUserRouter = loginUserRouter;
  private _registerUserRouter = registerUserRouter;
  private _currentUserRouter = currentUserRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use("/register", this._registerUserRouter);
    this._router.use("/login", this._loginUserRouter);
    this._router.use("/current", this._currentUserRouter);
  }
}

export = new MasterRouter().router;
