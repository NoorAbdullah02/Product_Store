import type { Request, Response } from 'express'
import * as queries from "../db/queries"

import { RegisterCheckValid } from '../validations/validinputs'

import { LoginValidationSchema } from '../validations/validinputs'

import { env } from '../config/env';
import { imagekit } from '../config/imagekit';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';




export const registerUser = async (req: Request, res: Response) => {
    try {
        // Validate body (name, email, password)
        const validationResult = await RegisterCheckValid.safeParseAsync(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: "Invalid request body",
                errors: validationResult.error.flatten().fieldErrors,
            });
        }

        const { name, email, password } = validationResult.data;

        // ✅ Check image
        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        // ✅ Fix TS issue
        const file = req.file as Express.Multer.File;

        // Upload image to ImageKit
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `user-${Date.now()}-${file.originalname}`,
            folder: "/users",
        });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in DB
        await queries.createUser({
            name,
            email,
            password: hashedPassword,
            imageUrl: uploadedImage.url, // ✅ FIXED
        });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Failed to register user" });
    }
};



export async function loginUser(req: Request, res: Response) {


    const validationResult = await LoginValidationSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            message: "Invalid Request Body",
            errors: validationResult.error.flatten().fieldErrors
        });
    }


    const { email, password } = validationResult.data;

    const user = await queries.getUserByEmail(email);

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(400).json({ message: "Invalid email or password" })
    }


    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        env.JWT_SECRET,
        { expiresIn: "1d" } // 1 Days
    );

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
    });
    return res.status(200).json({
        message: "Login successful",
        token
    });

}



