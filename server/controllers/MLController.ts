import { Request, Response } from "express";
import { hospitalRecommendRequest, waitTimeRequest } from "../types/hospitalRecTypes";

/**
 * Retrieves hospital recommendations based on user preferences.
 *
 * @param req The Express request object containing the list of hospitals.
 * @param res The Express response object for sending the recommendations.
 */
export const getHospitalRecommendations = async (req: Request, res: Response) => {
  const hospitalList = req.body;

  // Validate the request body
  if (!hospitalRecommendRequest.safeParse(hospitalList).success) {
    return res.status(403).json({ message: "Invalid request" });
  }

  try {
    // Send a POST request to the recommendation service
    const recommendation = await fetch("127.0.0.1:5000/recommend", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(hospitalList), // Ensure JSON string is sent
    });

    // Check if the recommendation was successful
    if (!recommendation.ok) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // Get the recommendation data
    const recommendationData = await recommendation.json();

    // Send the recommendation data as a JSON response
    res.json(recommendationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Retrieves estimated waiting times for hospitals.
 *
 * @param req The Express request object containing the hospital information.
 * @param res The Express response object for sending the waiting times.
 */
export const getHospitalWaitTimes = async (req: Request, res: Response) => {
  const waittimeBody = req.body;

  // Validate the request body
  if (!waitTimeRequest.safeParse(waittimeBody).success) {
    return res.status(403).json({ message: "Invalid request" });
  }

  try {
    // Send a POST request to the waiting time service
    const recommendation = await fetch("127.0.0.1:5000/waiting_time", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(waittimeBody),
    });

    // Check if the recommendation was successful
    if (!recommendation.ok) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // Get the waiting time data
    const waitingTimes = await recommendation.json();

    // Send the waiting times as a JSON response
    res.json(waitingTimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};