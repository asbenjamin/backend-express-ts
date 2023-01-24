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
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // use actual secret key here
    verify(token, process.env.JWT_SECRET!, (err: any, decode: any) => {
      if (err || !decode) {
        return res.status(401).json({
          success: false,
          message: "unauthorized",
        });
      } else {
        req.user = decode?.user || decode;
        console.log("00000000 user here", req.user["userId"]);

        return res.status(200).json({
          msg: "Success",
          userId: req.user.userId,
        });
        next();
      }
    });

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid, and you know it" });
  }
};
