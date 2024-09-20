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
    const {usuario} = req.params;
console.log(usuario)
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
     /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
    try {
        if (!req.body.platos) return res.status(400).send("No se encontro el campo platos"); 
        const {platos} = req.body
        if (!Array.isArray(platos)) return res.status(400).send("Platos no  es un array");
        if (!platos[0]) return res.status(400).send(" Debe haber al menos 1 producto"); 
        for (const plato of platos) {
            if (!plato.id || !plato.cantidad) return res.status(400).send("Faltan campos o son invalidos");
        } 
        // Crear el pedido
        
        const {idUsuario} = req.body
        const crearPedido = await PedidosService.createPedido(idUsuario, platos)
        if (!crearPedido) return res.status(400).send("No se ha podido crear el pedido")
        res.status(201).send("Exito al crear el pedido")
    }
    catch (error) {
        res.status(400).send("Error")
    }
} 

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
