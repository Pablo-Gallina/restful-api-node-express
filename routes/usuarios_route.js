const express = require('express');
const ruta = express.Router();

//Modelos
const Usuarios = require('../models/usuarios_model');

// data
const usuarios = [
    { id: 1, nombre: 'Pablo'},
    { id: 2, nombre: 'Daniel'},
    { id: 3, nombre: 'Yostin'},
    { id: 4, nombre: 'Selvin'}
]

ruta.get('/', (req, res)=>{
    res.send(usuarios)
})

// ****CRUD RUTAS
//?POST
ruta.post('/', (req, res)=>{
    const body = req.body; // al usar el express.json(), este formatea a json el nombre
    const resultado = crearUsuario(body); // Creando el usuario
    
    // Verificar si el usuario fue creado
    resultado
        .then( usuario => res.json({usuario: usuario}))
        .catch( e => res.status(400).json({
            error: e
        }))
})

//*****CRUD USUARIOS
//?POST
//Funcion para guardar dato (body, los datos enviados por el cliente)
const crearUsuario = async ({email, nombre, password}) =>{
    // Creando el usuario en base al modelo
    const usuario = new Usuarios({email, nombre, password}) // los demas campos no son requeridos

    try {
        const res = await usuario.save(); // Guardarlo en mongodb
        console.log(res); // mostrar resultado   
    } catch (e) {
        throw e;
    }
}

//Exportar todas las rutar
module.exports = ruta;