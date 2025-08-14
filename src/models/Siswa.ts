import { Schema, model, Document } from 'mongoose';

export interface ISiswa extends Document {
  nis: string;
  nama: string;
  kelas: Schema.Types.ObjectId;
  jenisKelamin: 'laki-laki' | 'perempuan';
}

const siswaSchema = new Schema<ISiswa>({
  nis: { 
    type: String, 
    required: true, 
    unique: true 
  },
  nama: { 
    type: String, 
    required: true 
  },
  kelas: { 
    type: Schema.Types.ObjectId, 
    ref: 'Kelas', 
    required: true 
  },
  jenisKelamin: { 
    type: String,
    enum: ['laki-laki', 'perempuan'],
    required: true 
  },
}, { 
  timestamps: true 
});

// Create and export the Siswa model
export const Siswa = model<ISiswa>('Siswa', siswaSchema);