import  express  from "express";
import {getProjects,createProject, getSingleProject, createBug, createDocuments, updateBug, createTask, updateTask} from "../controllers/projects.js";
//import { addCategory, getCategories, deleteCategories, getMedicines, addMedicines, deleteMedicine} from "../controllers/expense.js";

const router = express.Router();
router.get("/", getProjects);
router.get("/:name", getSingleProject);
router.post("/", createProject);
router.post("/bugs", createBug);
router.patch("/bugs", updateBug);
router.post("/tasks", createTask);
router.patch("/tasks", updateTask);
router.post("/documents", createDocuments);


export default router;