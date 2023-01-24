import { Router } from 'express';
import { body, check } from 'express-validator';
import { login } from '../../controllers/user/loginUserController';


class loginUserRouter {
  private _router = Router();
  private _controller = login;
  
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
    this._router.post('/', [
        check('phone').not().isEmpty().withMessage('telegram id is required'),
        check('password').isLength({min:8}).not().isEmpty().withMessage('Please use a password to proceed')
    ], this._controller);
  }
}

export = new loginUserRouter().router;
