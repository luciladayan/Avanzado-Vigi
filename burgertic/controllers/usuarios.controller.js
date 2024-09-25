import UsuariosService from "../services/usuarios.service.js"

const upgradeUusario = async (req,res)=>{
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({
        message: "El id no es numerico"
    })
    const usuario = await UsuariosService.getUsuarioById(id);

    if(!usuario)
        return res.status(404).json({
    message:"El usuario no existe"
    })

    if(usuario.admin)
        return res.status(400).json({
    message:"El usuario ya es admin"
    })
    UsuariosService.upgradeUsuario(id);    
    res.json({message:"Usuario upgradeado correctamente"})
}

export default {upgradeUsuario};