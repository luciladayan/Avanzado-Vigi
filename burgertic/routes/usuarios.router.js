import Router from "express";
import AuthController from "../controllers/auth.controller.js";
import usuariosController from "../controllers/usuarios.controller.js";


const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
router.get("/:id",usuariosController.upgradeUsuario);

export default router;
