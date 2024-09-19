import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {

    try {
        const pedidos = await PedidosService.getPedidos();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const getPedidosByUser = async (req, res) => {
    const { usuario } = req.params;

    if (!usuario) return res.status(400).json({ message: "Se necesita un usuario" });

    try {
        const pedidos = await PedidosService.getPedidosByUser(usuario);
        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPedidoById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedidos = await PedidosService.getPedidoById(id);
        if (!pedidos)
            return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createPedido = async (req, res) => {
    /*1*/
    const pedidos = req.body;
    /*2*/
    if (!Array.isArray(req.body.pedidos)) {
        return res.status(400).json({ error: "El campo pedidos debe ser un array" });
    }
    /*3*/
    if (req.body.pedidos.length === 0) {
        return res.status(400).json({ error: "El array de pedidos debe tener al menos un plato" });
    }
    /*4*/
    if (!pedidos.id || !pedidos.cantidad)
        return res.status(400).json({ message: "Faltan campos por llenar" });

    res.status(400).json({ message: error.message });

    try {
        await PedidosService.createPedido(pedidos);
        res.status(201).json({ message: "Pedido creado con exito" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const aceptarPedido = async (req, res) => {
        /*1*/ 
            const pedido = await PedidosService.getPedidoById(id);
        /*2*/
            if (!pedido)
                return res.status(404).json({ message: "Pedido no encontrado" });
        /*3 y 4*/
            if(pedido.estado !== "pendiente")
                return res.status(400).json({ message: "Pedido no pendiente" });

            /*5*/
            await updatePedido(id, "aceptado");

    try {
        await PedidosService.createPedido(pedidos);
        res.status(201).json({ message: "Pedido aceptado" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const comenzarPedido = async (req, res) => {
        /*1*/ 
            const pedido = await PedidosService.getPedidoById(id);
        /*2*/
            if (!pedido)
                return res.status(404).json({ message: "Pedido no encontrado" });
        /*3 y 4*/
            if(pedido.estado !== "aceptado")
                return res.status(400).json({ message: "Pedido no aceptado" });

            /*5*/
            await updatePedido(id, "en camino");

    try {
        await PedidosService.createPedido(pedidos);
        res.status(201).json({ message: "Pedido en camino" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const entregarPedido = async (req, res) => {
        /*1*/ 
            const pedido = await PedidosService.getPedidoById(id);
        /*2*/
            if (!pedido)
                return res.status(404).json({ message: "Pedido no encontrado" });
        /*3 y 4*/
            if(pedido.estado !== "en camino")
                return res.status(400).json({ message: "Pedido no en camino" });
            /*5*/
            await updatePedido(id, "entregado");

    try {
        await PedidosService.createPedido(pedidos);
        res.status(201).json({ message: "Pedido entregado" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });
        
    try {
        await PedidosService.deletePedido(id);
        res.json({ message: "Pedido eliminado con éxito" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
