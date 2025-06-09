import { User } from "../models/User";
import { LoginDto } from "../dto/login.validation";
import { PasswordService } from "../utils/password.service";
import { generateAuthToken } from "../utils/jwt.utils";
import { ObjectId, Types } from "mongoose";

export class AuthService {
    async login(data: LoginDto) {
        try {
            // Find user by username
            const user = await User.findOne({ username: data.username }).select('+password');
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Verify password
            const isPasswordValid = await PasswordService.comparePassword(
                data.password,
                user.password
            );
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = generateAuthToken({
                id: (user._id as ObjectId).toString(),
                username: user.username,
                role: user.role
            });

            // Return user data without password and with token
            const { password, ...userWithoutPassword } = user.toObject();
            
            return {
                user: userWithoutPassword,
                token
            };
            
        } catch (error: any) {
            throw error;
        }
    }

    // async getCurrentUser(userId: string) {
    //     try {
    //         const ObjectId = new Types.ObjectId(userId);
    //         const user = await User.findById(ObjectId).select('-password');
            
    //         if (!user) {
    //             throw new Error('User not found');
    //         }

    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}