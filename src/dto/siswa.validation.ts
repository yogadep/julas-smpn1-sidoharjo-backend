// import { z } from 'zod';
// import { Types } from 'mongoose';

// export const CreateSiswaSchema = z.object({
//   nis: z.string().min(3),
//   nama: z.string().min(1),
//   kelas: z.string().min(2),
//   jenisKelamin: z.enum(['laki-laki', 'perempuan'])
// });

// export const UpdateSiswaSchema = CreateSiswaSchema.partial();

// // Export TypeScript types
// export type CreateSiswaDto = z.infer<typeof CreateSiswaSchema>;
// export type UpdateSiswaDto = z.infer<typeof UpdateSiswaSchema>;

import { z } from 'zod';
import mongoose from 'mongoose';

export const CreateSiswaSchema = z.object({
  nis: z.string()
    .min(3, 'NIS minimal 3 karakter')
    .max(20, 'NIS maksimal 20 karakter')
    .regex(/^[0-9]+$/, 'NIS harus angka'),
  
  nama: z.string()
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  
  jenisKelamin: z.enum(['laki-laki', 'perempuan'], {
    required_error: 'Jenis kelamin wajib diisi',
    invalid_type_error: 'Pilih antara laki-laki atau perempuan'
  }),
  
  kelas: z.string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'ID kelas tidak valid'
    })
    .transform((val) => new mongoose.Types.ObjectId(val))
});

export const UpdateSiswaSchema = CreateSiswaSchema
  .partial()
  .extend({
    kelas: z.string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'ID kelas tidak valid'
      })
      .transform((val) => val ? new mongoose.Types.ObjectId(val) : undefined)
      .optional()
  });

// TypeScript Types
export type CreateSiswaDto = z.infer<typeof CreateSiswaSchema>;
export type UpdateSiswaDto = z.infer<typeof UpdateSiswaSchema>;