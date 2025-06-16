import { Schema, model, Document } from 'mongoose';

export interface IMapel extends Document {
  kodeMapel: string;
  namaMapel: string;
  description: string;
}

const mapelSchema = new Schema<IMapel>({
  kodeMapel: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  namaMapel: {
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
export const Mapel = model<IMapel>('Mapel', mapelSchema);