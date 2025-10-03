import { Jurnal } from "../models/Jurnal";
import { Types } from "mongoose";
import { CreateJurnalDto, UpdateJurnalDto } from "../dto/jurnal.validation";

export class JurnalService {
    async getJurnal() {
        return Jurnal.find()
        //   .populate('guru', 'username')                  // ambil nama guru saja
          .populate('guru', 'namaLengkap') 
          .populate('kelas', 'namaKelas')                  // ambil nama kelas saja
          .populate('mapel', 'namaMapel')                  // ambil nama mapel saja
          .populate('siswaTidakHadir siswaIzin siswaSakit', 'nama') // 3 array siswa sekaligus
          .lean();
    }

    async getJurnalByUser(userId: string) {
        try {
            return await Jurnal.find({ guru: new Types.ObjectId(userId) })
                .populate('guru', 'namaLengkap')
                .populate('kelas', 'namaKelas')
                .populate('mapel', 'namaMapel')
                .sort({ tanggal: -1 })
                .lean();
        } catch (error) {
            throw error;
        }
    }

    async getJurnalById(id: string) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const jurnal = await Jurnal.findById(ObjectId)
                .populate('guru', 'namaLengkap')
                .populate('kelas', 'namaKelas')
                .populate('mapel', 'namaMapel')
                .populate('siswaTidakHadir siswaIzin siswaSakit', 'nis nama')
                .lean();
            return jurnal;
        } catch (error) {
            throw error;
        }
    }

    async getJurnalByGuru(guruId: string) {
        try {
            return await Jurnal.find({ guru: new Types.ObjectId(guruId) })
                .populate('guru', 'namaLengkap')
                .populate('kelas', 'namaKelas')
                .populate('mapel', 'namaMapel')
                .populate('siswaTidakHadir siswaIzin siswaSakit', 'nama')
                .sort({ createdAt: -1 })
                .lean();
        } catch (error) {
            throw error;
        }
    }

    async getJurnalByKelas(id: string) {
        try {
            return await Jurnal.find({ kelas: new Types.ObjectId(id) })
                .populate('guru', 'namaLengkap')
                .populate('mapel', 'namaMapel')
                .sort({ tanggal: -1 })
                .lean();
        } catch (error) {
            throw error;
        }
    }

    async createJurnal(data: CreateJurnalDto) {
        try {
            const jurnal = await Jurnal.create(data);
            return jurnal;
        } catch (error) {
            throw error;
        }
    }

    async updateJurnal(id: string, data: UpdateJurnalDto) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const jurnal = await Jurnal.findOneAndUpdate(
                ObjectId,
                { $set: data },
                { new: true, runValidators: true }
            ).lean();
            return jurnal;
        } catch (error) {
            throw error;
        }
    }

    async deleteJurnal(id: string) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const jurnal = await Jurnal.findByIdAndDelete(ObjectId);
            return jurnal;
        } catch (error) {
            throw error;
        }
    }
}