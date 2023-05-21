import  express  from "express";
import {getUsers,createUser, loginUser} from "../controllers/users.js";
//import { addCategory, getCategories, deleteCategories, getMedicines, addMedicines, deleteMedicine} from "../controllers/expense.js";

const router = express.Router();
router.get("/",getUsers);
router.post("/",createUser);
router.post("/login",loginUser);

export default router;