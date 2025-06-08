import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'guru' | 'kepsek';
  namaLengkap: string;
  nip?: string;
  email?: string;
  alamat?: string;
  mataPelajaran?: string[];
  kelasYangDiampu?: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'guru', 'kepsek'], 
    required: true 
  },
  namaLengkap: { 
    type: String, 
    required: true 
  },
  nip: { 
    type: String, 
    required: false 
  },
  email: { 
    type: String, 
    required: false 
  },
  alamat: { 
    type: String, 
    required: false 
  },
  mataPelajaran: [{ 
    type: String 
  }],
  kelasYangDiampu: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Kelas' 
  }]
}, { 
  timestamps: true 
});

// Create and export the User model
export const User = model<IUser>('User', userSchema);