const express = require('express');
const ruta = express.Router();

// data
const cursos = [
    { id: 1, nombre: 'JS'},
    { id: 2, nombre: 'CSS'},
    { id: 3, nombre: 'HTML'},
    { id: 4, nombre: 'REACT'}
]

ruta.get('/', (req, res)=>{
    res.send(cursos)
})

//Exportar todas las rutar
module.exports = ruta;