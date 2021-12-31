const express = require('express');
const ruta = express.Router();

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

//Exportar todas las rutar
module.exports = ruta;