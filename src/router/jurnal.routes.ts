import { Router } from "express";
import {
    getJurnal,
    getJurnalById,
    getJurnalByGuru,
    getJurnalByKelas,
    createJurnal,
    updateJurnal,
    deleteJurnal,
} from "../controller/jurnal.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";


const router = Router();

router.get("/getjurnal", getJurnal)
    .get("/getjurnal/:id", getJurnalById)
    .get("/getjurnalbyguru/:id", getJurnalByGuru)
    .get("/getjurnalbykelas/:id", getJurnalByKelas)
    .post("/addjurnal", authenticate, authorizeAdmin, createJurnal)
    .put("/updatejurnal/:id", authenticate, authorizeAdmin, updateJurnal)
    .delete("/deletejurnal/:id", authenticate, authorizeAdmin, deleteJurnal);

export default router;
