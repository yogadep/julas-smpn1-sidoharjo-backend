import { Request, Response } from "express";
import { SiswaService } from "../services/siswa.service";
import { CreateSiswaSchema, UpdateSiswaSchema } from "../dto/siswa.validation";
import { ZodError } from "zod";
import { handleError } from "../utils/errorHandler";

// Initialize service
const siswaService = new SiswaService();        

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await siswaService.getStudents();
        res.status(200).json({
            success: true,
            message: 'Students fetched successfully',
            statusCode: 200,
            data: students
        });
    } catch (error) {
        handleError(error, res);
    }
}

export const getStudentById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const student = await siswaService.getStudentById(id);
        res.status(200).json({
            success: true,
            message: 'Student fetched successfully',
            statusCode: 200,
            data: student
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const getStudentsWithKelas = async (req: Request, res: Response) => {
    try {
        const students = await siswaService.getStudentsWithKelas();
        res.status(200).json({
            success: true,
            message: 'Students with kelas data fetched successfully',
            data: students
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const getStudentsByKelasId = async (req: Request, res: Response) => {
    try {
        // Make sure parameter name matches your route definition
        const { id } = req.params;
        
        if (!id) {
            res.status(400).json({  
                success: false,
                message: 'Kelas ID is required'
            });
        }

        const students = await siswaService.getStudentsByKelasId(id);
        
        res.status(200).json({  
            success: true,
            message: `Students in kelas ${id} fetched successfully`,
            data: students
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const createStudent = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateSiswaSchema.parse(req.body);
        const student = await siswaService.createStudent(validatedData);
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            statusCode: 201,
            data: student
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = UpdateSiswaSchema.parse(req.body);
        const student = await siswaService.updateStudent(validatedData, id);
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            statusCode: 200,
            data: student
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const student = await siswaService.deleteStudent(id);
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            statusCode: 200,
            data: student
        })
    } catch (error) {
        handleError(error, res);
    }
}