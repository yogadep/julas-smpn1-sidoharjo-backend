import { Router } from "express";
import { login} from "../controller/auth.controller";

const router = Router();

router.post("/login", login);
// router.get("/current-user", getCurrentUser);

export default router;
