import {Response} from "express";
import jwt from "jsonwebtoken";
import {JWT} from "@constants/constants.ts";

export const generateToken = (userId: string, res: Response): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET not defined in environment variables');
    }

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT.EXPIRES_IN });

    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET as string, // Assure TypeScript that this env var exists
        {expiresIn: JWT.EXPIRES_IN}
    );

    res.cookie("jwt", token, {
        maxAge: JWT.EXPIRES_IN, // In milliseconds
        httpOnly: true,         // Helps prevent XSS attacks
        sameSite: "strict",     // Helps prevent CSRF
        secure: process.env.NODE_ENV !== "development", // Only send cookie on HTTPS except in dev
    });

    return token;
};
