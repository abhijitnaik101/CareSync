import z from "zod";

export const hospitalRecommendReq = z.object({
    Disease: z.string(),
    "Distance from AIIMS Bhubaneswar": z.number(),
    "Distance from IGKC Multispeciality hospital": z.number(),
    "Distance from SUM Ultimate": z.number(),
    "Distance from ApolloMedicare": z.number(),
    "hour_of_day": z.number().min(0).max(23).int(),
    "day_of_week": z.union([
        z.literal("Sunday"),
        z.literal("Monday"),
        z.literal("Tuesday"),
        z.literal("Wednesday"),
        z.literal("Thursday"),
        z.literal("Friday"),
        z.literal("Saturday")
    ])
});

export const waitTimeReq = z.object({
    Hospital: z.string(),
    "Arrival Time": z.string(),
    "Day of the Week": z.union([
        z.literal("Sunday"),
        z.literal("Monday"),
        z.literal("Tuesday"),
        z.literal("Wednesday"),
        z.literal("Thursday"),
        z.literal("Friday"),
        z.literal("Saturday")
    ]),
    "Ward Visited": z.string(),
    "Number of patients under age 30": z.number(),
    "Number of patients of age 31-50": z.number(),
    "Number of patients of age 51 and above": z.number()
})