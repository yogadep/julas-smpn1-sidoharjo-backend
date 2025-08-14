import { Router } from "express";
import { 
    getKelas,
    getKelasById,
    createKelas,
    updateKelas,
    deleteKelas,
    getKelasWithSiswa,
    getKelasByIdWithSiswa
} from "../controller/kelas.controller";

const router = Router();

router.get("/getkelas", getKelas)
    .get("/withsiswa", getKelasWithSiswa)
    .get("/getkelas/:id", getKelasById)
    .get("/withsiswa/:id", getKelasByIdWithSiswa)
    .post("/addkelas", createKelas)
    .put("/updatekelas/:id", updateKelas)
    .delete("/deletekelas/:id", deleteKelas);

export default router;
