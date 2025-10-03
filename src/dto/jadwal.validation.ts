// dtos/jadwal.dto.ts
import { z } from 'zod';
import { Types } from 'mongoose';

const objectId = z.string().refine(Types.ObjectId.isValid, 'Invalid ObjectId').transform(v => new Types.ObjectId(v));

export const CreateJadwalSchema = z.object({
  kelas: objectId,
  hari: z.enum(['senin','selasa','rabu','kamis','jumat','sabtu']),
  jamKe: z.coerce.number().int().min(1).max(8),
  // mapel opsional (boleh null/slot kosong)
  mapel: z.union([objectId, z.null(), z.literal('')]).optional().transform(v => (v === '' ? null : v ?? null)),
  createdBy: z.string().min(1), // createdBy & updatedBy JANGAN dari FE
});
// createdBy & updatedBy JANGAN dari FE — server yang set dari JWT

export const UpdateJadwalSchema = z.object({
  kelas: objectId.optional(),
  hari: z.enum(['senin','selasa','rabu','kamis','jumat','sabtu']).optional(),
  jamKe: z.coerce.number().int().min(1).max(8).optional(),
  mapel: z.union([objectId, z.null(), z.literal('')]).optional().transform(v => (v === '' ? null : v ?? undefined)),
  createdBy: z.string().min(1),
});

export type CreateJadwalDto = z.infer<typeof CreateJadwalSchema>;
export type UpdateJadwalDto = z.infer<typeof UpdateJadwalSchema>;
