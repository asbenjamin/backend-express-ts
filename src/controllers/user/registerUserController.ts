import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../../models/users";
import jwt from "jsonwebtoken";
import { collections } from "../../utils/databaseservices";

export async function register(req: Request, res: Response) {
  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // create user
  const { tgId, password } = req.body;

  // check if user with same tgId number already exists
  const existingUser = await collections.users?.findOne({
    tgId: parseInt(tgId),
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this tgId number already exists" });
  }

  const user = User.build({ tgId, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await collections.users?.insertOne(user);

  const payload = {
    user: {
      id: user._id,
    },
  };

  user.password = await bcrypt.hash(password, salt);

  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user._id,
      tgId: user.tgId,
      message: "User Created",
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error signing token",
      error: err.message,
    });
  }
}
