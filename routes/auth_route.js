const express = require('express');
const ruta = express.Router();

//Modelos
const Usuarios = require('../models/usuarios_model');

//Esquemas (schema)
// const schema = require('../schema/usuarios_schema');

// Modulo para encryptar contraseñas
const bcrypt = require('bcrypt');
const saltRounds = 10;

ruta.post('/', (req, res)=>{
    const { email, password } = req.body;

    Usuarios.findOne({ email })
        .then(datos => {
            if(datos){
               res.json(datos)
            }else{
                res.status(400).json({
                    error:'ok',
                    msj:'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error:'ok',
                msj:'Error en el servicio' + err
            })
        })

})

module.exports = ruta;