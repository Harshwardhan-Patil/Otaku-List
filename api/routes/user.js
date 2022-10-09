import express from "express";
import { verifyTokenAndAuthorization,verifyTokenAndAdmin} from "./verify.js";
import { updateUser,deleteUser } from "../controllers/userController.js";
const router = express.Router();

router.put("/:id",verifyTokenAndAuthorization,updateUser);

router.delete("/:id",verifyTokenAndAdmin,deleteUser);

export default router;