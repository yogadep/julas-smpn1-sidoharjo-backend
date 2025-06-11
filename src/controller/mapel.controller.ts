import { Request, Response } from "express";
import { MapelService } from "../services/mapel.service";
import { CreateMapelSchema } from "../dto/mapel.validation";
import { handleError } from "../utils/errorHandler";

const mapelService = new MapelService();

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