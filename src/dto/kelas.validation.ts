import { z } from "zod";
import { Types } from "mongoose";

export const CreateKelasSchema = z.object({
    namaKelas: z.string().min(2),
    description: z.string().optional(),
});

export const UpdateKelasSchema = CreateKelasSchema.partial();

export type CreateKelaslDto = z.infer<typeof CreateKelasSchema>;
export type UpdateKelasDto = z.infer<typeof UpdateKelasSchema>;