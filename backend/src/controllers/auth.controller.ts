import {Request, Response} from 'express';
import {
    consoleLogDebug,
    consoleLogError,
    consoleLogSuccess,
    LOGIN_ERROR, LOGOUT_ERROR,
    PASSWORD,
    SIGNUP_ERROR,
    SUCCESS_MESSAGE
} from "@constants/constants";
import User from "@models/user.model";
import bcrypt from "bcryptjs";
import {generateToken} from "@lib/utils";

export const signup = async (req: Request, res: Response): Promise<void> => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            consoleLogError(`${SIGNUP_ERROR.FULLNAME_EMAIL_PASSWORD_NULL} `);
            res.status(500).json({message: SIGNUP_ERROR.FULLNAME_EMAIL_PASSWORD_NULL});
            return;
        }

        const user = await User.findOne({email});

        if (user) {
            consoleLogError(`${SIGNUP_ERROR.USER_EXISTS}: ${user.email}`);
            res.status(400).json({message: SIGNUP_ERROR.USER_EXISTS});
            return;
        }

        if (!password || password.length < PASSWORD.MIN_LENGTH) {
            consoleLogError(`${PASSWORD.ERROR_MESSAGE}: ${password}`);
            res.status(400).json({message: PASSWORD.ERROR_MESSAGE});
            return;
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

        consoleLogSuccess(`${SUCCESS_MESSAGE.SIGNUP} ${email}`);

    } catch (error) {
        consoleLogError(`${SIGNUP_ERROR.GENERAL_SIGNUP_ERROR} ` + (error instanceof Error ? error.message : String(error)));
        res.status(500).json({message: SIGNUP_ERROR.GENERAL_SIGNUP_ERROR});
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        // NOTE: the user will NOT know which one is incorrect: password or email
        if (!user) {
            consoleLogError(`${LOGIN_ERROR.USER_DOESNT_EXIST}: ${email}`);
            res.status(400).json({message: LOGIN_ERROR.USER_OR_PASSWORD});
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            consoleLogError(`${LOGIN_ERROR.WRONG_PASSWORD} entered for user: ${user.email}`);
            res.status(400).json({message: LOGIN_ERROR.USER_OR_PASSWORD});
            return;
        }

        // Login is now successful
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

        consoleLogSuccess(`${SUCCESS_MESSAGE.LOGIN} ${user.email}`);

    } catch (error) {
        consoleLogError(`${LOGIN_ERROR.GENERAL_LOGIN_ERROR} ` + (error instanceof Error ? error.message : String(error)));
        res.status(500).json({message: LOGIN_ERROR.GENERAL_LOGIN_ERROR});
    }
};

export const logout = (req: Request, res: Response): void => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: SUCCESS_MESSAGE.LOGOUT});
        consoleLogSuccess(`${SUCCESS_MESSAGE.LOGOUT}`);
        return;
    } catch (error) {
        consoleLogError(`${LOGOUT_ERROR} ` + (error instanceof Error ? error.message : String(error)));
        res.status(500).json({message: LOGOUT_ERROR});
    }
};
