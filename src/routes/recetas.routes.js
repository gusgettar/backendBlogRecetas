import { Router } from "express";
import { crearReceta, listarRecetas, obtenerReceta, borrarReceta, editarReceta } from "../controllers/recetas.controllers.js";
import validacionReceta from "../helpers/validacionReceta.js";


const router = Router();

router.route("/recetas").post([validacionReceta],crearReceta).get(listarRecetas)
router.route("/recetas/:id").get(obtenerReceta).delete(borrarReceta).put(editarReceta)



export default router;
