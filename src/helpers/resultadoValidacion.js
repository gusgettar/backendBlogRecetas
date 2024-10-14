import { validationResult } from "express-validator";


const resultadoValidacion = (req, res, next) => {
  //validar los datos para crear el producto
  //pedir al modelo Producto que genere uno nuevo
  const errors = validationResult(req);
  //errors.isEmpty() => true: no se produjeron errores; false: => hay errores
  //quiero saber si hay errores, quiero saber si errors no esta vacio
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  //continuar con la ejecucion del siguiente codigo
  next()
};

export default resultadoValidacion
