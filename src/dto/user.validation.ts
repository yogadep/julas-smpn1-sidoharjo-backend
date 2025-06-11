import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['admin', 'guru', 'kepsek']),
  namaLengkap: z.string().min(3),
  nip: z.string().optional(),
  email: z.string().email().optional(),
  alamat: z.string().optional(),
  mataPelajaran: z.array(z.string()).optional(),
  kelasYangDiampu: z.array(z.string().transform(val => new Types.ObjectId(val))).optional(),
});

// TODO : Create endpoint to update password

// partial : membuat semua field pada schema menjadi opsional
// omit password : menghapus field password dari schema, agar tidak bisa diubah lewat schema ini
export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true });

// Export TypeScript types
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;