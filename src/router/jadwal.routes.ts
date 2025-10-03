import { Router } from "express";
import { createJadwal, deleteJadwal, getJadwal, getAllJadwal, updateJadwal, getJadwalByGuru } from "../controller/jadwal.controller";
import { authenticate, authorizeAdmin, authorizeAnyRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/addjadwal", authenticate, authorizeAnyRole, createJadwal)
      .get("/getjadwals", getAllJadwal)
router.get("/getjadwal/:id", getJadwal)
      .get("/getjadwalbyguru/:id", getJadwalByGuru)
      .put("/updatejadwal/:id", authenticate, authorizeAnyRole, updateJadwal)
      .delete("/deletejadwal/:id", authenticate, authorizeAnyRole, deleteJadwal);

export default router;