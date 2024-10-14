import mongoose from "mongoose";

const mongobd = process.env.MONGODB

mongoose.connect(mongobd)

const conexion = mongoose.connection

conexion.once('open', ()=>{
    console.info('BD conectada')
})