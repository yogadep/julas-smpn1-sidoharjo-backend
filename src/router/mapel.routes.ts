import { Router } from "express";
import { createMapel } from "../controller/mapel.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";

const router = Router();

router.post("/addmapel", authenticate, authorizeAdmin, createMapel);

export default router;