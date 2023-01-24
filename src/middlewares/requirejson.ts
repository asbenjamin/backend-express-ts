import { NextFunction, Response, Request } from "express"

export const requireJsonContent = () => {
  return (req: any, res: Response, next:NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Server requires application/json')
    } else {
      next()
    }
  }
}
