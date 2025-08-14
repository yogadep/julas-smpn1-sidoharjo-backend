import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateJurnalSchema = z.object({
//   tanggal: z.date().optional().default(new Date()),
  guru: z.string().transform(val => new Types.ObjectId(val)),
  kelas: z.string().transform(val => new Types.ObjectId(val)),
  mapel: z.string().transform(val => new Types.ObjectId(val)),
  jamPelajaran: z.number().min(1).max(12),
  materi: z.string().min(3).optional(),
  siswaTidakHadir: z.array(
    z.string().transform(val => new Types.ObjectId(val))
  ).optional().default([]),
  siswaIzin: z.array(
    z.string().transform(val => new Types.ObjectId(val))
  ).optional().default([]),
  siswaSakit: z.array(
    z.string().transform(val => new Types.ObjectId(val))
  ).optional().default([]),
  catatan: z.string().optional()
});

export const UpdateJurnalSchema = CreateJurnalSchema.partial().extend({
  // You might want to make some fields non-updatable
  guru: z.string().transform(val => new Types.ObjectId(val)).optional(),
  kelas: z.string().transform(val => new Types.ObjectId(val)).optional(),
  mapel: z.string().transform(val => new Types.ObjectId(val)).optional()
});

// Export TypeScript types
export type CreateJurnalDto = z.infer<typeof CreateJurnalSchema>;
export type UpdateJurnalDto = z.infer<typeof UpdateJurnalSchema>;