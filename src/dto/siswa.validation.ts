import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateSiswaSchema = z.object({
  nis: z.string().min(3),
  nama: z.string().min(1),
  kelas: z.string().min(2),
  jenisKelamin: z.enum(['laki-laki', 'perempuan'])
});

export const UpdateSiswaSchema = CreateSiswaSchema.partial();

// Export TypeScript types
export type CreateSiswaDto = z.infer<typeof CreateSiswaSchema>;
export type UpdateSiswaDto = z.infer<typeof UpdateSiswaSchema>;