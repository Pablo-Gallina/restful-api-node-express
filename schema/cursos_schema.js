// Modulo para validacion de datos
const Joi = require('joi');

//****Esquemas de validacion (JOI)
const schema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(50)
        .required(),

    descripcion: Joi.string()
        .min(3)
        .max(150)
        .required(),

    descripcion: Joi.string()
        .min(3)
        .max(150)
        .required(),

    imagen: Joi.string()
        .min(3)
        .max(100)
        .required(),
})
//Exportar schema
module.exports = schema;