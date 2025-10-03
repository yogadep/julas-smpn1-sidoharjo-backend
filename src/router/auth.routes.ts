import { Router } from "express";
import { login, logout } from "../controller/auth.controller";

const router = Router();

router.post("/login", login)
      .post("/logout", logout);
// router.get("/current-user", getCurrentUser);

export default router;
