import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/users";
import { collections } from "../../utils/databaseservices";

export async function login(req: Request, res: Response) {
  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // find user by phone
  const user = await collections.users?.findOne({
    phone: parseInt(req.body.phone),
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // compare passwords
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // create jwt token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.json({ token, userId: user._id });
}
