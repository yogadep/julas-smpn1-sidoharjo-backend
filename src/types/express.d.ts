import { Document } from "mongoose";
import { User } from "../src/models/User";

declare global {
    namespace Express {
        interface Request {
            user?: User & Document; // Menambahkan properti user ke tipe Request Express
        }
    }
}