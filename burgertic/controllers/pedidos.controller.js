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
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPedido = async (req, res) => {

    try {
        if (!req.body.platos) return res.status(400).send("No se encontro el campo platos"); 
        const {platos} = req.body
        if (!Array.isArray(platos)) return res.status(400).send("Platos no  es un array");
        if (!platos[0]) return res.status(400).send(" Debe haber al menos 1 producto"); 
        for (const plato of platos) {
            if (!plato.id || !plato.cantidad) return res.status(400).send("Faltan campos o son invalidos");
        } 

        // Crear el pedido
        
        const id = req.id;
        const crearPedido = await PedidosService.createPedido(id, platos)
        if (!crearPedido) return res.status(400).send("No se ha podido crear el pedido")
        res.status(201).send("Exito al crear el pedido")
    }
    catch (error) {
        res.status(400).send("Error")
    }
} 

const aceptarPedido = async (req, res) => {

    try {
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

  await PedidosService.createPedido(pedidos);
  res.status(201).json({ message: "Pedido aceptado" });

}
 catch (error) {
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
