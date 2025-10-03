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
import { authenticate, authorizeAdmin, authorizeAnyRole } from "../middleware/auth.middleware";


const router = Router();

router.get("/getjurnal", getJurnal)
    .get("/getjurnal/:id", getJurnalById)
    .get("/getjurnalbyguru/:id", getJurnalByGuru)
    .get("/getjurnalbykelas/:id", getJurnalByKelas)
    .post("/addjurnal", authenticate, authorizeAnyRole, createJurnal)
    .put("/updatejurnal/:id", authenticate, authorizeAnyRole, updateJurnal)
    .delete("/deletejurnal/:id", authenticate, authorizeAnyRole, deleteJurnal);

export default router;
