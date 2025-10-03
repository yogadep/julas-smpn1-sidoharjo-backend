import { Kelas } from "../models/Kelas";
import { Types } from "mongoose";
import { CreateKelaslDto, UpdateKelasDto } from "../dto/kelas.validation";

export class KelasService {
    async getKelas() {
        try {
            const kelas = await Kelas.find()
            .lean();
            return kelas;
        } catch (error) {
            throw error;
        }
    }
    async getKelasById(id: string) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const kelas = await Kelas.findById(ObjectId).lean();
            return kelas;
        } catch (error) {
            throw error;
        }
    }

    async getKelasWithSiswa() {
        try {
            return await Kelas.find().populate({
                path: 'siswa',
                select: 'nis nama',
                options: { sort: { nama: 1 } }
            }).lean();
        } catch (error) {
            throw error;
        }
    }

    async getKelasByIdWithSiswa(id: string) {
        try {
            return await Kelas.findById(id).populate({
                path: 'siswa',
                select: 'nis nama jenisKelamin',
                options: { sort: { nama: 1 } }
            }).lean();
        } catch (error) {
            throw error;
        }
    }

    async createKelas(data: CreateKelaslDto) {
        try {
            const kelas = await Kelas.create(data);
            return kelas;
        } catch (error) {
            throw error;
        }
    }

    async updateKelas(id: string, data: UpdateKelasDto) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const kelas = await Kelas.findOneAndUpdate(
                ObjectId,
                { $set: data},
                { new: true, runValidators: true }
            ).lean();
            return kelas;
        } catch (error) {
            throw error;
        }
    }

    async deleteKelas(id: string){
        try {
            const ObjectId = new Types.ObjectId(id);
            const kelas = await Kelas.findByIdAndDelete(ObjectId);
            return kelas;
        } catch (error) {
            throw error;
        }
    }
}