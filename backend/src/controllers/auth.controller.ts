import { Request, Response } from 'express';
export const signup = (req: Request, res: Response): void => {
    res.send("Sign up route");
};
export const login = (req: Request, res: Response): void => {
    res.send("Login up route");
};
export const logout = (req: Request, res: Response): void => {
    res.send("Logout up route");
};
