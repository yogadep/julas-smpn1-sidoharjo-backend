import { Request, Response } from "express";
import { JurnalService } from "../services/jurnal.service";
import { CreateJurnalSchema, UpdateJurnalSchema } from "../dto/jurnal.validation";
import { handleError } from "../utils/errorHandler";

const jurnalService = new JurnalService();

export const getJurnal = async (req: Request, res: Response) => {
    try {
        const jurnal = await jurnalService.getJurnal();
        res.status(200).json({
            success: true,
            message: 'Jurnal fetched successfully',
            statusCode: 200,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};

// export const getJurnalByGuru = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const jurnal = await jurnalService.getJurnalByGuru(id);
        
//         res.status(200).json({
//             success: true,
//             message: 'Jurnal by guru fetched successfully',
//             statusCode: 200,
//             data: jurnal
//         });
//     } catch (error) {
//         handleError(error, res);
//     }
// }

export const getJurnalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const jurnal = await jurnalService.getJurnalById(id);
        
        if (!jurnal) {
            res.status(404).json({
                success: false,
                message: 'Jurnal not found',
                statusCode: 404
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Jurnal fetched successfully',
            statusCode: 200,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const getJurnalByGuru = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const jurnal = await jurnalService.getJurnalByGuru(id);
        
        res.status(200).json({
            success: true,
            message: 'Jurnal by guru fetched successfully',
            statusCode: 200,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const getJurnalByKelas = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const jurnal = await jurnalService.getJurnalByKelas(id);
        
        res.status(200).json({
            success: true,
            message: 'Jurnal by kelas fetched successfully',
            statusCode: 200,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const createJurnal = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateJurnalSchema.parse(req.body);
        const jurnal = await jurnalService.createJurnal(validatedData);

        res.status(201).json({
            success: true,
            message: 'Jurnal created successfully',
            statusCode: 201,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const updateJurnal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = UpdateJurnalSchema.parse(req.body);
        const jurnal = await jurnalService.updateJurnal(id, validatedData);

        res.status(200).json({
            success: true,
            message: 'Jurnal updated successfully',
            statusCode: 200,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const deleteJurnal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const jurnal = await jurnalService.deleteJurnal(id);

        if (!jurnal) {
            res.status(404).json({
                success: false,
                message: 'Jurnal not found',
                statusCode: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Jurnal deleted successfully',
            statusCode: 200,
            data: jurnal
        });
    } catch (error) {
        handleError(error, res);
    }
};