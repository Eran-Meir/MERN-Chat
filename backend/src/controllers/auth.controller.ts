import {Request, Response} from 'express';
import {PASSWORD, USER} from "@constants/constants";
import User from "@models/user.model";
import bcrypt from "bcryptjs";
import {generateToken} from "@lib/utils";

export const signup = async (req: Request, res: Response): Promise<void> => {
    const {fullName, email, password} = req.body;
    try {
        if (!password || password.length <= PASSWORD.MIN_LENGTH) {
            res.status(400).json({message: PASSWORD.ERROR_MESSAGE});
        }

        const user = await User.findOne({email});

        if (user) {
            res.status(400).json({message: USER.EXISTS_ERROR_MESSAGE});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePicture: newUser.profilePic
        });

    } catch (error) {
        console.log(USER.SIGNUP_ERROR_MESSAGE, error instanceof Error ? error.message : String(error));
        res.status(500).json({message: USER.SIGNUP_ERROR_MESSAGE});
    }
};

export const login = (req: Request, res: Response): void => {
    res.send("Login route");
};

export const logout = (req: Request, res: Response): void => {
    res.send("Logout route");
};
