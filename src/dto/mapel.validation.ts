import { z } from "zod";
import { Types } from "mongoose";

export const CreateMapelSchema = z.object({
    kodeMapel: z.string().min(3),
    namaMapel: z.string().min(3),
});

export type CreateMapelDto = z.infer<typeof CreateMapelSchema>;
export type UpdateMapelDto = z.infer<typeof CreateMapelSchema>;