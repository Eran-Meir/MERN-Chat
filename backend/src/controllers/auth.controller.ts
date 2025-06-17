import {Request, Response} from 'express';
import {PASSWORD, USER} from "@constants/constants.ts";
import User from "@models/user.model.ts"

export const signup = async (req: Request, res: Response): void => {
    const {fullName, email, password} = req.body;
    try {
        // Hash our password
        if (password.length <= PASSWORD.LENGTH) {
            return res.status(400).json({message: PASSWORD.ERROR_MESSAGE})
        }
        const user = await User.findOne(email)

        if (user) {
            return res.status(400).json({message: USER.ERROR_MESSAGE})
        }
    } catch (err) {

    }

};
export const login = (req: Request, res: Response): void => {
    res.send("Login up route");
};
export const logout = (req: Request, res: Response): void => {
    res.send("Logout up route");
};
