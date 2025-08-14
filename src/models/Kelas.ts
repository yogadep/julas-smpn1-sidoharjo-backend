import { Schema, model, Document } from 'mongoose';

export interface IKelas extends Document {
  namaKelas: string;
  description: string;
  siswa: Schema.Types.ObjectId[]
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
  siswa: [{
    type: Schema.Types.ObjectId,
    ref: 'Siswa'
  }]
}, {
  timestamps: true
});

// Create and export the Mapel model
export const Kelas = model<IKelas>('Kelas', kelasSchema);