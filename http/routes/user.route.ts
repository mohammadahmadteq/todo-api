import {Router} from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/add", UserController.addNewUser);

export default router;
