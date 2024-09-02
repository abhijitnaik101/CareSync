import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticatePatient = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role != "Patient")
        return res.status(401).json({ message: "Invalid credentials" });

    next();
}