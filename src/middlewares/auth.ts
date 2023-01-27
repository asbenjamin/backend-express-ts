import jwt, { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-auth-token");
    // console.log(token, typeof token);

    // check if no token
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // use actual secret key here
    verify(token, process.env.JWT_SECRET!, (err: any, decode: any) => {
      if (err || !decode) {
        return res.status(401).json({
          message: "Unauthorized Access or Expired Token",
        });
      } else {
        req.user = decode?.user || decode;

        res.status(200).json({
          message: "Success",
          userId: req.user.userId,
        });
        next();
      }
    });

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid, and you know it" });
  }
};
