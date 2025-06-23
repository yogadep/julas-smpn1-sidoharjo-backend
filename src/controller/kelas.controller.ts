import { Request, Response } from "express";
import { KelasService } from "../services/kelas.service";
import { CreateKelasSchema, UpdateKelasSchema } from "../dto/kelas.validation";
import { handleError } from "../utils/errorHandler";

const kelasService = new KelasService();

export const getKelas = async ( req: Request, res: Response ) => {
    try {
        const kelas = await kelasService.getKelas();
        res.status(200).json({
            success: true,
            message: 'Kelas fetched successfully',
            statusCode: 200,
            data: kelas
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const getKelasById = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const kelas = await kelasService.getKelasById(id);
        if(!kelas){
            res.status(404).json({
                success: false,
                message: 'Kelas not found',
                statusCode: 404
            });
        }else{
            res.status(200).json({
                success: true,
                message: 'Kelas fetched successfully',
                statusCode: 200,
                data: kelas
            });
        }
    } catch (error) {
        handleError(error, res);
    }
}

export const createKelas = async ( req: Request, res: Response ) => {
    try {
        const validatedData = CreateKelasSchema.parse(req.body);
        const kelas = await kelasService.createKelas(validatedData);

        res.status(201).json({
            succwess: true,
            message: 'Kelas created successfully',
            statusCode: 201,
            data: kelas
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const updateKelas = async ( req: Request, res: Response ) => {
    try {
        const validatedData = UpdateKelasSchema.parse(req.body);
        const kelas = await kelasService.updateKelas(req.params.id, validatedData);

        res.status(201).json({
            succwess: true,
            message: 'Kelas updated successfully',
            statusCode: 201,
            data: kelas
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const deleteKelas = async ( req: Request, res: Response ) => {
    try {
        const kelas = await kelasService.deleteKelas(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Kelas deleted successfully',
            statusCode: 200,
            data: kelas
        });
    } catch (error) {
        handleError(error, res);
    }
}