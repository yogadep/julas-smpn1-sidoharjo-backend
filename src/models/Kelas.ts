import { Schema, model, Document } from 'mongoose';

export interface IKelas extends Document {
  namaKelas: string;
  description: string;
}

const kelasSchema = new Schema<IKelas>({
  namaKelas: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
}, {
  timestamps: true
});

// Create and export the Mapel model
export const Kelas = model<IKelas>('Kelas', kelasSchema);