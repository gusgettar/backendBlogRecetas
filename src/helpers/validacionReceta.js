import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  check("nombreReceta")
    .notEmpty()
    .withMessage("El nombre de la receta es un dato obligatorio")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "El nombre del producto debe contener como minimo 2 caracteres y como maximo 50 caracteres inclusive"
    ),
  check("tipo")
    .notEmpty()
    .withMessage("El tipo es un dato obligatorio"),
  check("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage(
      "La imagen debe ser una URL valida y terminar en alguna de las siguientes extensiones"
    ),
  check("ingredientes")
    .notEmpty()
    .withMessage("los ingredientes son un campo obligatorio")
    .isLength({
      min: 10,
      max: 200,
    })
    .withMessage(
      "Los ingredientes deben contener como minimo 10 caracteres y como maximo 200 caracteres inclusive"
    )
    ,
  check("instrucciones")
    .notEmpty()
    .withMessage("las instrucciones es un campo obligatorio")
    .isLength({
      min: 2,
      max: 500,
    })
    .withMessage(
      "La longitud minima es de 2 caracteres y la maxima de 500 caracteres"
    ),
  

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
