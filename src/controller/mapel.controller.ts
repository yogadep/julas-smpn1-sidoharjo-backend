import { Request, Response } from "express";
import { MapelService } from "../services/mapel.service";
import { CreateMapelSchema, UpdateMapelSchema } from "../dto/mapel.validation";
import { handleError } from "../utils/errorHandler";

const mapelService = new MapelService();

export const getMapels = async (req: Request, res: Response) => {
    try {
        const mapels = await mapelService.getMapels();
        res.status(200).json({
            success: true,
            message: 'Mapels fetched successfully',
            statusCode: 200,
            data: mapels
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const getMapel = async (req: Request, res: Response) => {
    try {
        const mapel = await mapelService.getMapelById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Mapel fetched successfully',
            statusCode: 200,
            data: mapel
        });
    } catch (error) {
        handleError(error, res);
    }
}
export const createMapel = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateMapelSchema.parse(req.body);
        const mapel = await mapelService.createMapel(validatedData);

        res.status(201).json({
            succwess: true,
            message: 'Mapel created successfully',
            statusCode: 201,
            data: mapel
        })
    } catch (error: any) {
        handleError(error, res);
    }
}

export const updateMapel = async (req: Request, res: Response) => {
    try {
        const validatedData = UpdateMapelSchema.parse(req.body);
        const mapel = await mapelService.updateMapel(req.params.id, validatedData);

        res.status(201).json({
            succwess: true,
            message: 'Mapel updated successfully',
            statusCode: 201,
            data: mapel
        })
    } catch (error) {
        handleError(error, res);
    }
}

export const deleteMapel = async (req: Request, res: Response) => {
    try {
        const mapel = await mapelService.deleteMapel(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Mapel deleted successfully',
            statusCode: 200,
            data: mapel
        });
    } catch (error) {
        handleError(error, res);
    }
}

