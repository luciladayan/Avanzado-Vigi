import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */

try {

    /*1*/
    const {usuario} = req.body;
    if(!usuario) return 
    return res.status(400).json({ message: "No tiene body" });
    
    /*2*/
    if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.password)
        return res.status(400).json({ message: "Faltan campos por llenar" });

    /*3*/
    usuario = await UsuariosService.getUsuarioByEmail(email);
    if (usuario)
    return res.status(404).json({ message: "Usuario ya existente" });
    

    /*5*/
    usuario.password = await bcrypt.hash(usuario.password, 10)
    
/*6  */
const usuarioInsert = await UsuariosService.createUsuario(usuario)
if(!usuarioInsert) return  res.status(500).json({ message: error.message });
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
};

export default { register, login };
