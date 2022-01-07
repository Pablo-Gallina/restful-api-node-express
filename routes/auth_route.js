const express = require('express');
const ruta = express.Router();

//Modelos
const Usuarios = require('../models/usuarios_model');

//Esquemas (schema)
// const schema = require('../schema/usuarios_schema');

// Modulo para encryptar contraseñas
const bcrypt = require('bcrypt');
const saltRounds = 10;

// JWT
var jwt = require('jsonwebtoken');

ruta.post('/', (req, res)=>{
    const { email, password } = req.body;

    Usuarios.findOne({ email })
        .then(datos => {
            if(datos){
                const passwordValido = bcrypt.compareSync(password, datos.password); // Comparar si el password es correcto (true || false)
                // Si el password es incorrecto
                if(!passwordValido) return res.status(400).json({error:'ok', msj:'Usuario o contraseña incorrecta.'})
                
                // Creacion del token
                const jwToken = jwt.sign({
                    usuario: {_id: datos._id, nombre: datos.nombre, email: datos.email}
                }, 'secret', { expiresIn: '24h' });

                // Mostrar los datos del usuario logueado
                res.json({
                    usuario:{
                        _id:datos._id,
                        nombre:datos.nombre,
                        email:datos.email
                    },
                    jwToken
                });
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