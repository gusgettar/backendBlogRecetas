import mongoose, {Schema} from "mongoose";

const recetaSchema =  new Schema({
    nombreReceta:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        unique: true
    },
    tipo:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    ingredientes:{
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200
    },
    instrucciones:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 500,
       },
    
       imagen:{
        type: String,
        required: true,
        validate: {
            validator: (valor)=> {
                return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(valor)
            }
        }
       }
    
})

const Receta = mongoose.model('receta', recetaSchema)

export default Receta