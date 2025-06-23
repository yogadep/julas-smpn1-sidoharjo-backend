import { Router } from "express";
import { getKelas, getKelasById, createKelas, updateKelas, deleteKelas } from "../controller/kelas.controller";

const router = Router();

router.get("/getkelas", getKelas)
    .get("/getkelas/:id", getKelasById)
    .post("/addkelas", createKelas)
    .put("/updatekelas/:id", updateKelas)
    .delete("/deletekelas/:id", deleteKelas);

export default router;
