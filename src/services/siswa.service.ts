import { Siswa } from "../models/Siswa";
import { CreateSiswaDto, UpdateSiswaDto } from "../dto/siswa.validation";
import { Types } from "mongoose";

export class SiswaService {
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

    async createStudent(data: CreateSiswaDto) {
        try {
            const student = await Siswa.create(data);
            return student;
        } catch (error) {
            throw error;
        }
    }

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