import { Pedido } from "../models/pedido.model.js"; 
import { PedidoPlato } from "../models/pedidoplato.model.js";
import { Plato } from "../models/plato.model.js";
import { Usuario } from "../models/usuario.model.js";


const getPlatosByPedido = async (idPedido) => {
    const pedidoPlatos = await PedidoPlato.findAll({
        where: { idPedido },
        include: [{ model: Plato }],
    });

    if (!pedidoPlatos.length) throw new Error("Pedido no encontrado");

    return pedidoPlatos.map(pedidoPlato => ({
        ...pedidoPlato.Plato.toJSON(),
        cantidad: pedidoPlato.cantidad,
    }));
};

const getPedidos = async () => await Pedido.findAll();

const getPedidoById = async (id) => {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
};

const getPedidosByUser = async (idUsuario) => {
    const pedidos = await Pedido.findAll({
        where: { idUsuario },
        include: {
            model: PedidoPlato,
            include: { model: Plato },
        },
    });

    if (!pedidos.length) return [];

    return pedidos.map(pedido => ({
        ...pedido.toJSON(),
        platos: pedido.PedidoPlatos.map(pedidoPlato => ({
            ...pedidoPlato.Plato.toJSON(),
            cantidad: pedidoPlato.cantidad,
        })),
    }));
};

const createPedido = async (idUsuario, platos) => {
    const platoIds = platos.map(plato => plato.id);
    const platosExistentes = await Plato.findAll({ where: { id: platoIds } });
    if (platosExistentes.length !== platos.length) throw new Error("Uno o más platos no existen");

    const pedido = await Pedido.create({
        idUsuario,
        fecha: new Date(),
        estado: "pendiente",
    });

    await Promise.all(
        platos.map(plato =>
            PedidoPlato.create({
                idPedido: pedido.id,
                idPlato: plato.id,
                cantidad: plato.cantidad,
            })
        )
    );

    return pedido;
};

const updatePedido = async (id, estado) => {
    const estadosValidos = ["pendiente", "aceptado", "en camino", "entregado", "cancelado"];
    if (!estadosValidos.includes(estado)) throw new Error("Estado inválido");

    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");

    pedido.estado = estado;
    await pedido.save();
    return pedido;
};

const deletePedido = async (id) => {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");

    await pedido.destroy();
    return pedido;
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
