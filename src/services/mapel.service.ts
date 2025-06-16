import { Mapel } from "../models/Mapel";
import { CreateMapelDto, UpdateMapelDto } from "../dto/mapel.validation";
import { Types } from "mongoose";
import { create } from "domain";

export class MapelService {
    async getMapels() {
        try {
            const mapels = await Mapel.find().lean();
            return mapels;
        } catch (error) {
            throw error;
        }
    }
    async getMapelById(id: string) {
        try {
            const ObjectId = new Types.ObjectId(id);
            const mapel = await Mapel.findById(ObjectId).lean();
            return mapel;
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

    async updateMapel(id: string, data: UpdateMapelDto){
        try {
            const ObjectId = new Types.ObjectId(id);
            const mapel = await Mapel.findOneAndUpdate(
                ObjectId,
                { $set: data},
                { new: true, runValidators: true }
            ).lean();
            return mapel;
        } catch (error) {
            throw error;
        }
    }
}