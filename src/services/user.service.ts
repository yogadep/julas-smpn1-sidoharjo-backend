import { User } from "../models/User";
import { PasswordService } from "../utils/password.service";
import { CreateUserDto, UpdateUserDto } from "../dto/user.validation";
import { Types } from "mongoose";

export class UserService {
    async getUsers() {
        try {
            const users = await User.find()
                .select('-password').lean()
                .lean();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async getUser(id: string) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const user = await User.findById(ObjectId)
                .select('-password').lean()
            return user;
        } catch (error) {
            throw error;
        }
    }
    // create user 
    async createUser(data: CreateUserDto) {
        try {
            const hashedPassword = await PasswordService.hashPassword(data.password);
            
            // Mapping data dari DTO ke schema Mongoose
            const userData = {
                username: data.username,
                password: hashedPassword,
                role: data.role,
                namaLengkap: data.namaLengkap,
                nip: data.nip,
                email: data.email,
                alamat: data.alamat,
                mataPelajaran: data.mataPelajaran,
                kelasYangDiampu: data.kelasYangDiampu
            };

            const user = await User.create(userData);
            
            // Return data tanpa password
            const { password, ...result } = user.toObject();
            return result;
            
        } catch (error: any) {
            // Handle duplicate key error (unique constraint)
            if (error.code === 11000) {
                const keyValue = error.keyValue;
                const field = Object.keys(keyValue)[0];
                const value = keyValue[field];
                throw new Error(`User with ${field} '${value}' already exists`);
            }
            throw error; 
        }
    }

    // update user
    async updateUser(id: string, data: UpdateUserDto ){
        try {
            const ObjectId = new Types.ObjectId(id);
            const updateUser = await User.findOneAndUpdate(
                ObjectId,
                { $set: data,},
                { new: true, runValidators: true }
            ).select('-password').lean();
            return updateUser;
        } catch (error: any) {
             // Handle duplicate key error (unique constraint)
             if (error.code === 11000) {
                const keyValue = error.keyValue;
                const field = Object.keys(keyValue)[0];
                const value = keyValue[field];
                throw new Error(`User with ${field} '${value}' already exists`);
            }
            throw error;
        }
    }

    // delete user
    async deleteUser(id: string){
        try {
            const ObjectId = new Types.ObjectId(id);
            const user = await User.findByIdAndDelete(ObjectId);
            return user;
        } catch (error: any) {
            if (error.code === 11000) {
                const keyValue = error.keyValue;
                const field = Object.keys(keyValue)[0];
                const value = keyValue[field];
                throw new Error(`User with ${field} '${value}' already exists`);
            }
            throw error;
        }
    }
}