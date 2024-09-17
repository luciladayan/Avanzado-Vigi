import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/pedidos", verifyToken, verifyAdmin, PedidosController.getPedidos);
router.get("/pedidos/usuario", verifyToken, PedidosController.getPedidosByUser);
router.get("/pedidos/:id", verifyToken, verifyAdmin, PedidosController.getPedidoById);

router.post("/pedidos", verifyToken, PedidosController.createPedido);

router.put("/pedidos/:id/aceptar", PedidosController.aceptarPedido);
router.put("/pedidos/:id/comenzar",verifyToken, verifyAdmin, PedidosController.comenzarPedido);
router.put("/pedidos/:id/entregar",verifyToken,verifyAdmin, PedidosController.entregarPedido);
router.delete("/pedidos/:id", verifyToken, verifyAdmin, PedidosController.deletePedido);


export default router;
