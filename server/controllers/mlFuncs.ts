import { Request, Response } from "express";
import { hospitalRecommendReq, waitTimeReq } from "../types/hospitalRecTypes";

export const getHospitalRecommend = async (req: Request, res: Response) => {
    const hospitalList = req.body;
    if (!hospitalRecommendReq.safeParse(hospitalList).success)
        return res.status(403).json({ message: "Invalid request" });

    const recommendation = await fetch("127.0.0.1:5000/recommend", {
        method: "POST",
        body: hospitalList,
        headers: { "content-type": "application/json" }
    });

    if (!recommendation)
        return res.status(500).json({ message: "internal server error" });

    res.json(recommendation);
};

export const getWaitTimeRecommend = async (req: Request, res: Response) => {
    const waittimeBody = req.body;

    if (!waitTimeReq.safeParse(waittimeBody).success)
        return res.status(403).json({ message: "Invalid request" });

    const recommendation = await fetch("127.0.0.1:5000/waiting_time", {
        method: "POST",
        headers: { "conttent-type": "application/json" },
        body: waittimeBody
    });

    if (!recommendation)
        return res.status(500).json({ message: "internal server error" });

    res.json(recommendation);
};