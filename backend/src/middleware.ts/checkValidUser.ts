import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Request, Response, NextFunction } from 'express';
import { getUserByEmail } from '../db/queries';


export async function checkValiditi(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { email: string; };

        const user = await getUserByEmail(decoded.email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // attach user to request (cast to any if you haven't extended Request type)
        (req as any).user = user;

        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({ message: "Invalid Token Please Login Again" });
    }


}