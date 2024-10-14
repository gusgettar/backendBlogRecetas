import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import './src/database/databaseConnection.js'
import recetaRouter from './src/routes/recetas.routes.js'
import usuarioRouter from './src/routes/usuarios.routes.js'
//1- configurar un puerto
const app = express()

app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), ()=>{
    console.info('estoy escuchando el puerto '+app.get('port'))
})
//2- configurar middlewares
app.use(cors()) //permite conexiones remotas
app.use(morgan('dev')) //nos da informacion extra en la terminal
app.use(express.json()) //nos permite interpretar los datos del body en formato json
app.use(express.urlencoded({extended:true})) //interpretar datos enviados en formularios
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//console.log(__filename)
//console.log(__dirname)
//console.log(path.join(__dirname,'/public'))
app.use(express.static(path.join(__dirname,'/public')))
//agregar como recibir conexiones remotas

//3- configurar las rutas

app.use('/api',recetaRouter)
app.use('/api/usuarios',usuarioRouter)
