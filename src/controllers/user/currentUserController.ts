import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { collections } from "../../utils/databaseservices";


export async function returnUser(req: Request, res: Response){
    console.log("99999999999999999999999999999")
    // try {
    //     const decoded = jwt.verify(req.token, 'wefwe3436456y5hfef');
    //     const user = await collections.users?.findOne({ _id: decoded.user.id });
    //     if (!user) {
    //         return res.status(404).json({ msg: 'User not found' });
    //     }
    //     res.json(user);
    // } catch (err) {
    //     res.status(401).json({ msg: 'Token is not valid' });
    // };

}
