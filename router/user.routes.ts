import { Router } from "express";
import { createUser, updateUser, getUsers, deleteUser, getUser }  from "../controller/user.controller";

const router = Router();

router.post("/adduser", createUser)
      .get("/getusers", getUsers)
router.put("/updateuser/:id", updateUser)
      .delete("/deleteuser/:id", deleteUser)
      .get("/getuser/:id", getUser);


export default router;

