import e from "express"
import Receta from "../database/model/receta.js"



export const crearReceta =  async (req,res)=>{
    try {
        


       const recetaNueva = new Receta(req.body)

        //guardo en la base de datos
        await recetaNueva.save()

        //envio una respuesta al front
        res.status(201).json({
            mensaje: "La receta fue creada correctamente"
        })
    } catch (error) {
        //envio una respuesta al front algo fallo
        console.error(error)
        res.status(500).json({
            mensaje: "Ocurrio un error, no se pudo crear la receta"
        })
    }  
   
}

export const listarRecetas = async(req,res)=>{
    try {
        //pedirle a la BD la collection de productos
        //enviar en la respuesta la lista de productos
        const recetas = await Receta.find()
        res.status(200).json(recetas)
    } catch (error) {
        //enviar un mensaje de error si falla
        res.status(404).json({
            mensaje: "Ocurrio un error, no se encontraron las recetas"
        })
    }
}
export const obtenerReceta = async(req,res)=>{
    try {
        //extraer de la solicitud el ID
        
        //pedirle a la BD que busque ese producto
        const recetaBuscada = await Receta.findById(req.params.id)
        if(!recetaBuscada){
            return res.status(404).json({mensaje: "La receta no fue encontrada"})
        }
        //enviar el producto
        res.status(200).json(recetaBuscada)
    } catch (error) {
        //enviar un mensaje de error si falla
        res.status(404).json({
            mensaje: "Ocurrio un error, no se pudo obtener la receta"
        })
    }
}

export const borrarReceta = async (req,res)=>{
    try {
        //Primero quiero saber si esta el id, si no esta contesto con un codigo de error
        const recetaBuscada = await Receta.findById(req.params.id)
        if(!recetaBuscada){
            return res.status(404).json({mensaje: "La receta no fue encontrada"})
        }
        //si esta le pido a la bd que borre el producto
        await Receta.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje: 'La receta fue eliminada correctamente'})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "Ocurrio un error, al intentar borrar una receta"})
    }
}

export const editarReceta = async (req,res)=>{
    try {
        //necesito el id y el body
        //validar los datos del body
        //pedirle a la bd que busque si esta el id y edite el producto
        const recetaBuscada = await Receta.findById(req.params.id)
        if(!recetaBuscada)
        return  res.status(404).json({mensaje: "La receta no fue encontrada"})
        await Receta.findByIdAndUpdate(req.params.id, req.body)
        
        res.status(200).json({mensaje: "La receta fue editada correctamente"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "Ocurrio un error, al intentar editar la receta"})
    
    }
}
