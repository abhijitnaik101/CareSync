import z from "zod";

export const queueRequest = z.object({
    hospitalId: z.number(),
    appointmentDate: z.coerce.date()
});

export const ticketAppointRequest = z.object({
    name: z.string(),
    age: z.number(),
    gender: z.union([z.literal("MALE"), z.literal("FEMALE"), z.literal("TRANS")]),
    appointType: z.union([z.literal("OPD"), z.literal("IPD")]),
    patientId: z.number().optional(),
    doctorId: z.number().optional(),
    hospitalId: z.number(),
    appointmentDate: z.string()
});