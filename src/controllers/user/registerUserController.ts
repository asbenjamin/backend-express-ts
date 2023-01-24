import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../../models/users'
import jwt from 'jsonwebtoken';
import { collections } from '../../utils/databaseservices';

export async function register(req: Request, res: Response) {
    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // create user
    const { tgId, password } = req.body;

    // check if user with same tgId number already exists
    const existingUser = await collections.users?.findOne({ "tgId": parseInt(tgId) });

    if (existingUser) {
        return res.status(400).json({ message: 'User with this tgId number already exists' });
    }

    const user = User.build({tgId, password})
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log(user.tgId, user.password)
    await collections.users?.insertOne(user);

    const payload = {
      user: {
        id: user.id
      }
    };

    user.password = await bcrypt.hash(password, salt);
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,

      { expiresIn: 360000 },
      
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ 
          "token": token, 
          "user": user.tgId, 
          "detail": "User created" 
        });
      }
    );   
}
