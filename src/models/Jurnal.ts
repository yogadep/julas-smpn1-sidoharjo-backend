import { Schema, model, Document, Types } from 'mongoose';

export interface IJurnal extends Document {
  // tanggal: Date;
  guru: Types.ObjectId;       // Reference ke User (role guru)
  kelas: Types.ObjectId;      // Reference ke Kelas
  mapel: Types.ObjectId;      // Reference ke Mapel
  jamPelajaran: number;       // Jam ke-berapa (1-12)
  materi: string;             // Materi yang diajarkan
  siswaTidakHadir: Types.ObjectId[];  // Array siswa tidak hadir
  siswaIzin: Types.ObjectId[];        // Array siswa izin
  siswaSakit: Types.ObjectId[];       // Array siswa sakit
  catatan?: string;           // Catatan tambahan
}

const jurnalSchema = new Schema<IJurnal>({
  // tanggal: { 
  //   type: Date, 
  //   required: true,
  //   default: Date.now 
  // },
  guru: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  kelas: { 
    type: Schema.Types.ObjectId, 
    ref: 'Kelas', 
    required: true 
  },
  mapel: { 
    type: Schema.Types.ObjectId, 
    ref: 'Mapel', 
    required: true 
  },
  jamPelajaran: { 
    type: Number, 
    required: true 
  },
  materi: { 
    type: String, 
    required: false
  },
  siswaTidakHadir: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Siswa' 
  }],
  siswaIzin: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Siswa' 
  }],
  siswaSakit: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Siswa' 
  }],
  catatan: { 
    type: String 
  }
}, { 
  timestamps: true  // Otomatis createdAt dan updatedAt
});

export const Jurnal = model<IJurnal>('Jurnal', jurnalSchema);