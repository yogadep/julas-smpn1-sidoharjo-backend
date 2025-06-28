import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserSchema, UpdateUserSchema } from "../dto/user.validation";
import { ZodError } from "zod";
import { handleError } from "../utils/errorHandler";

// Initialize service
const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            statusCode: 200,
            data: users
        });
    } catch (error) {
        handleError(error, res);
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);

        if(!user){
            res.status(404).json({
                success: false,
                message: 'User not found',
                statusCode: 404
            });
        }else{
            res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                statusCode: 200,
                data: user
            });
        }
    } catch (error) {
        handleError(error, res);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateUserSchema.parse(req.body);
        const newUser = await userService.createUser(validatedData);
        
        // Remove the 'return' and just send the response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            statusCode: 201,
            data: newUser,
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = UpdateUserSchema.parse(req.body);

        const updatedUser = await userService.updateUser(id, validatedData);
        
        // Remove the 'return' and just send the response
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            statusCode: 200,
            data: updatedUser
        });
    } catch (error) {
      handleError(error, res);  
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            statusCode: 200,
            data: deletedUser
        });
    } catch (error: any) {
        handleError(error, res);
    }
}