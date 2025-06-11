import { Mapel } from "../models/Mapel";
import { CreateMapelDto } from "../dto/mapel.validation";
import { Types } from "mongoose";
import { create } from "domain";

export class MapelService {
    async getMapel() {
        try {
            const mapels = await Mapel.find().lean();
            return mapels;
        } catch (error) {
            throw error;
        }
    }

    async createMapel(data: CreateMapelDto){
        try {
            const mapel = await Mapel.create(data);
            return mapel;
        } catch (error) {
            throw(error);
        }
    }   
}