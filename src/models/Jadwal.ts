// models/Jadwal.ts
import { Schema, model, Document, Types } from 'mongoose';

type Hari = 'senin'|'selasa'|'rabu'|'kamis'|'jumat'|'sabtu';

export interface IJadwal extends Document {
  kelas: Types.ObjectId;                    // ref Kelas
  hari: Hari;
  jamKe: number;                             // 1..8
  mapel?: Types.ObjectId | null;             // ref Mapel (boleh null/slot kosong)
  createdBy: Types.ObjectId;                 // ref User (Wajib)
  updatedBy?: Types.ObjectId | null;         // ref User (Opsional)
}

const jadwalSchema = new Schema<IJadwal>({
  kelas:      { type: Schema.Types.ObjectId, ref: 'Kelas', required: true },
  hari:       { type: String, enum: ['senin','selasa','rabu','kamis','jumat','sabtu'], required: true, lowercase: true, trim: true },
  jamKe:      { type: Number, required: true, min: 1, max: 8 },
  mapel:      { type: Schema.Types.ObjectId, ref: 'Mapel', default: null },
  createdBy:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

jadwalSchema.index({ kelas: 1, hari: 1, jamKe: 1 }, { unique: true });

export const Jadwal = model<IJadwal>('Jadwal', jadwalSchema);
