import { Router } from "express";
import { createMapel, getMapel, getMapels, updateMapel } from "../controller/mapel.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";

const router = Router();

router.post("/addmapel", authenticate, authorizeAdmin, createMapel)
      .get("/getmapels", getMapels)
router.get("/getmapel/:id", getMapel)
      .put("/updatemapel/:id", authenticate, authorizeAdmin, updateMapel)

export default router;