import { Siswa } from "../models/Siswa";
import { Kelas } from "../models/Kelas";
import { CreateSiswaDto, UpdateSiswaDto } from "../dto/siswa.validation";
import { Types } from "mongoose";

export class SiswaService {
    async getStudentsWithKelas() {
        try {
            return await Siswa.find().populate('kelas', 'namaKelas description').lean();
        } catch (error) {
            throw error;
        }
    }

    async getStudentsByKelasId(kelasId: string) {
        try {
            return await Siswa.find({ kelas: kelasId })
                .select('nis nama jenisKelamin')
                .lean();
        } catch (error) {
            throw error;
        }
    }

    async createStudent(data: CreateSiswaDto) {
        try {
            const student = await Siswa.create(data);
            
            // Update kelas dengan menambahkan siswa baru
            await Kelas.findByIdAndUpdate(
                data.kelas,
                { $addToSet: { siswa: student._id } },
                { new: true }
            );
            
            return student;
        } catch (error) {
            throw error;
        }
    }
    
    async getStudents() {
        try {
            const students = await Siswa.find().lean();
            return students;
        } catch (error) {
            throw error;
        }
    }

    async getStudentById(id: string) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const student = await Siswa.findById(ObjectId).lean();
            return student;
        } catch (error) {
            throw error;
        }
    }

    // async createStudent(data: CreateSiswaDto) {
    //     try {
    //         const student = await Siswa.create(data);
    //         return student;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async updateStudent(data: UpdateSiswaDto, id: string) {
        try {
            const objectId = new Types.ObjectId(id);
            const student = await Siswa.findOneAndUpdate(
                objectId,
                { $set: data },
                { new: true, runValidators: true }
            )
            return student;
        } catch (error) {
            throw error;
        }
    }

    async deleteStudent(id: string) {
        try {
            const objectId = new Types.ObjectId(id);
            const student = await Siswa.findOneAndDelete(objectId);
            return student;
        } catch (error) {
            throw error;
        }
    }
}