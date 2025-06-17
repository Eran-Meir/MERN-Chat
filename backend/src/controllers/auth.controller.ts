import {Request, Response} from 'express';
import {PASSWORD, USER} from "@constants/constants.ts";
import User from "@models/user.model.ts"
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const {fullName, email, password} = req.body;
    try {
        // Hash our password
        if (password.length <= PASSWORD.LENGTH) {
            return res.status(400).json({message: PASSWORD.ERROR_MESSAGE})
        }
        const user = await User.findOne(email)

        if (user) {
            return res.status(400).json({message: USER.EXISTS_ERROR_MESSAGE});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })
        if (newUser) {
            // Generating our jwt token here
        } else {
            res.status(400).json({message: USER.DATA_ERROR_MESSAGE})
        }
    } catch (error) {

    }

};
export const login = (req: Request, res: Response): void => {
    res.send("Login up route");
};
export const logout = (req: Request, res: Response): void => {
    res.send("Logout up route");
};
