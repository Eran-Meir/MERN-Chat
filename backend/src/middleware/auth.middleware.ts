import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "@models/user.model.ts";
import { InferSchemaType, Document } from "mongoose";

// Define the expected JWT payload structure
interface JwtPayload {
    userId: string;
}

// Infer the User document type from the schema
type UserDocument = InferSchemaType<typeof User.schema> & Document;

// Extend Express Request to include cookies and user
interface AuthenticatedRequest extends Request {
    cookies: {
        jwt?: string;
    };
    user?: UserDocument;
}

// Protect route middleware
export const protectRoute = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ message: "Unauthorized - No token provided" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401).json({ message: "Unauthorized - User not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }
};
