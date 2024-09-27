import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";
import "dotenv/config"

export const verifyToken = async (req, res, next) => {

    try {
        if (!req.headers.authorization) return res.status(400).send("No hay headers de autorizacion");
        // return res.send({a: req.headers.authorization});
        
        const token = (req.headers.authorization.split(" "))[1];
        console.log(token)
        if (!token) return res.status(400).send("Esta en el formato incorrecto");
        const val = await jwt.verify(token, process.env.SECRET);
        if (!val) return res.status(403).send("El token no es valido");
        if (!val.id) return res.status(403).send("El usuario no tiene una cuenta");

        req.id = val.id;
        next();
    }
    catch (error) {
        res.status(401).send({ message: error.message });
    }

};

export const verifyAdmin = async (req, res, next) => {
    const id = req.id
    
    try {
        const usuario = await UsuariosService.getUsuarioById(id)

        if (!usuario.admin) {
            return res.status(403).send("Solo los administradores pueden acceder");
        }

        next();
    }
    catch {
        res.status(401).send("Hubo un problema");
    }
};
