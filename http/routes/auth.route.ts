import {Router} from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.get("/oAuth2Login", AuthController.oAuth2Login);
router.get("/oAuth2Callback", AuthController.oAuth2Callback);

export default router;

