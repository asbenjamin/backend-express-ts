import jwt from 'jsonwebtoken';
import { authMiddleware } from "../../middlewares/auth";
import { Router } from 'express';


class currentUserRouter {
  private _router = Router();
  
  get router() {
    return this._router;
  }
  
  constructor() {
    this._configure();
  }
  
  /**
  * Connect routes to their matching controller endpoints.
  */
  private _configure() {
    this._router.get('/', authMiddleware);
  }
}

export = new currentUserRouter().router;
