import { Router } from "express";
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from "../controller/siswa.controller";

const router = Router();

router.get("/getstudents", getStudents)
    .get("/getstudent/:id", getStudentById)
    .post("/addstudent", createStudent)
    .put("/updatestudent/:id", updateStudent)
    .delete("/deletestudent/:id", deleteStudent);

export default router;
