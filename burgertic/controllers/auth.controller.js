import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";

const register = async (req, res) => {
    try {
        /*1*/
        /*2*/
        if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.password)
            return res.status(400).json({ message: "Faltan campos por llenar" });
        const usuario = {nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email, password: req.body.password}
        JSON.stringify(usuario)
        /*3*/
        const usuarioExists = await UsuariosService.getUsuarioByEmail(usuario.email);
        if (usuarioExists)
            return res.status(404).json({ message: "Usuario ya existente" });

        /*5*/
        usuario.password = await bcrypt.hash(usuario.password, 10)

        /*6  */
        const usuarioInsert = await UsuariosService.createUsuario(usuario.usuario)
        if (!usuarioInsert) return res.status(500).json({ message: error.message });
        
        res.status(200).json({ message: "exito" });

    } catch (error) {
        /*4*/
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
    */

    try {
        /*1*/
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Faltan campos" });

        /*2*/
        const usuario = await UsuariosService.getUsuarioByEmail(email);

        /*3*/
        if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

        /*4*/
        const contraseñaCorrecta = bcrypt.compare(password, usuario.password);
        if (!contraseñaCorrecta) return res.status(400).json({ message: "La contraseña no es correcta" })

        /*5*/
        const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: "30m" });
        res.send(token)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default { register, login };
