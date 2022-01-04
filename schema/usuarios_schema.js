// Modulo para validacion de datos
const Joi = require('joi');

//****Esquemas de validacion (JOI)
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gt'] } })
        .required()
})
//Exportar schema
module.exports = schema;