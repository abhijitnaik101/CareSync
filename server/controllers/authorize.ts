import { Request, Response } from "express";

export const acceptAuthentication = (req: Request, res: Response) => {
    res.status(200);
}