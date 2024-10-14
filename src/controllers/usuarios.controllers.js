import Usuario from "../database/model/usuario.js";
import bcrypt from "bcrypt"

export const crearUsuario = async (req, res) => {
    try {
        const {email,password} = req.body
        //Encriptar el password
        //crear los saltos (bcrypt)
        const saltos = bcrypt.genSaltSync(10)
        const passwordHasheado = bcrypt.hashSync(password,saltos)
        const usuarioNuevo = new Usuario({email,password: passwordHasheado})

        await usuarioNuevo.save()
        res.status(201).json({
            mensaje:"El usuario fue creado correctamente"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje:"Ocurrio un error, no se pudo crear el usuario"
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email,password} = req.body
        //verificar si el correo existe
        const usuarioExistente = await Usuario.findOne({email})
        if(!usuarioExistente){
        return res.status(400).json({mensaje: "correo o contraseña incorrecta - email"})    
        }
        //verificar si el password es el mismo
        const passwordValido = bcrypt.compareSync(password, usuarioExistente.password)
        if(!passwordValido){
            return res.status(400).json({mensaje: "correo o contraseña incorrecta - password"})
        }
       
        res.status(200).json({
            mensaje:"Los datos del usuario son correctos",
            email
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje:"Ocurrio un error, no se pudo consultar el usuario"
        })
    }
}
export const listarUsuarios = async (req, res) => {
    try {
        const arrayUsuarios = await Usuario.find()
        res.status(200).json(arrayUsuarios)
    } catch (error) {
        res.status(404).json({
            mensaje:"Ocurrio un error, no se encontraron los usuarios"
        })
    }
}
export const obtenerUsuario = async (req,res) => {
    try {
        const usuarioBuscado = await Usuario.findById(req.params.id)
        if (!usuarioBuscado) {
            return res.status(404).json({
                mensaje:"El usuario no fue encontrado"
            })
        }
        res.status(200).json(usuarioBuscado)
    } catch (error) {
        res.status(500).json({
            mensaje:"Ocurrio un error, no se pudo obtener el usuario"
        })
    }
}
export const borrarUsuario = async (req,res) => {
    try {
        const usuarioBuscado = await Usuario.findById(req.params.id)
        if (!usuarioBuscado) {
            return res.status(404).json({
                mensaje:"El usuario no fue encontrado"
            })
        }
        await Usuario.findByIdAndDelete(req.params.id)
        res.status(200).json({
            mensaje:"El usuario fue borrado"
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Ocurrio un error al intentar borrar un usuario"
        })
    }
}
export const editarUsuario = async (req,res) => {
    try {
        const usuarioBuscado = await Usuario.findById(req.params.id)
        if (!usuarioBuscado) {
            return res.status(404).json({
                mensaje:"El usuario no fue encontrado"
            })
        }
        await Usuario.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            mensaje:"El usuario fue editado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Ocurrio un error al intentar editar un usuario"
        })
    }
}