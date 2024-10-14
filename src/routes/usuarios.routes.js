import { Router } from "express";
import { crearUsuario, listarUsuarios, obtenerUsuario, borrarUsuario, editarUsuario, login } from "../controllers/usuarios.controllers.js";
import validacionUsuario from "../helpers/validacionUsuario.js";


const usuarioRouter = Router();
usuarioRouter
  .route("/")
  .post([validacionUsuario], crearUsuario)
  .get(listarUsuarios);
usuarioRouter
  .route("/login")
  .post(login)
  
usuarioRouter
  .route("/:id")
  .get(obtenerUsuario)
  .delete(borrarUsuario)
  .put(editarUsuario);
export default usuarioRouter;