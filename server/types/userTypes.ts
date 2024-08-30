import z from "zod";

export const DocRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.literal("Doctor"),
    specialty: z.string().optional(),
    hospitalName: z.string(),
    hospitalDocpass: z.string(),
    description: z.string().optional(),
    workingdays: z.number()
});

export type DocRequestType = z.infer<typeof DocRequest>;

export const PatientRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.literal("Patient"),
    age: z.number(),
    bloodType: z.string().optional(),
    contact: z.string()
});

export type PatientRequestType = z.infer<typeof PatientRequest>;

export const ReceptionRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.literal("Reception"),
    hospitalName: z.string(),
    hospitalReceptionpass: z.string()
});

export type ReceptionRequestType = z.infer<typeof ReceptionRequest>;

export const InventoryRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.literal("InventoryMan"),
    hospitalName: z.string(),
    hospitalInventorypass: z.string()
});

export type InventoryRequestType = z.infer<typeof InventoryRequest>;

export const AdminRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.literal("Admin"),
    hospitalName: z.string(),
    hospitalAdminpass: z.string()
});

export type AdminRequestType = z.infer<typeof AdminRequest>;

export const roleSchema = z.object({
    role: z.union([
        z.literal('Admin'),
        z.literal('Doctor'),
        z.literal('Patient'),
        z.literal('Reception'),
        z.literal('Inventoryman')
    ])
});

export const loginRequest = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.string()
});