import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

export default router;
