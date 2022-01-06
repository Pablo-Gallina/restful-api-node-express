// Rutas
const usuarios = require('./routes/usuarios_route');
const cursos = require('./routes/cursos_route');

const express = require('express');
const app = express();

// MongoDB
const mongoose = require('mongoose');
// Desestrucutrando shema de mongoose
const { Schema } = mongoose;

// middlewares de terceros
const morgan = require('morgan')

// Variables de configuracion
// const config = require('./');

// *Middlewares
// Usar un middleware para dar formato json
app.use(express.json());
// express urlencoded
app.use(express.urlencoded({ extended: true }));

// uso de middlewares de terceros
// Morgan
app.use(morgan('tiny'));
console.log('morgan habilitado...');

// *rutas
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
//Ruta por defecto
app.get('/', function(req, res) {
    // tanto req como res, tienen varios metodos disponibles
    //send (enviar informacion al servidor)
    res.send('Servidor conectado...');
});

//const port = 3000;
//variables de entorno
const port = process.env.PORT || 3000; //En las variables de entorno toma el PORT sino existe el valor será 3000
//crear la variable de entorno en el cmd
//windows: set PORT=5000


// Si la coleccion no existe, mongodb lo crea
mongoose.connect('mongodb://localhost:27017/cursos')
    .then(() => console.log('Conectado con MongoDB...'))
    .catch( e => console.log('No se puedo conectar con MongoDB... \n', e));

app.listen(port , ()=>{
    console.log(`escuchando en el puerto http://localhost:${port}/`);
})