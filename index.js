// Rutas
const usuarios = require('./routes/usuarios');

const express = require('express');
const app = express();

// Variables de configuracion
const config = require('config');

// middlewares de terceros
const morgan = require('morgan')

// Usar un middleware para dar formato json
app.use(express.json())

// express urlencoded
app.use(express.urlencoded({ extended: true }))

// express public (archivos estaticos en el servidor)
// 'public es el nombre de la carpeta que contendra los archivos estaticos'
app.use(express.static('public'));
// Acceder al archivos: http://localhost:3000/imagen.png

//Usando las rutas
//Cada vez que entren a la ruta api/usuarios, invoca a las fuciones de usuarios (rutas)
app.use('/api/usuarios', usuarios);

// Configuracion de entornos (config)
console.log('Aplicacion' + config.get('nombre'));
console.log('BD server' + config.get('configDB.host'));
// Cambiar el entorno a produccion
// en la terminal: export NODE_ENV=production


// uso de middlewares de terceros
// Morgan, usar morgan solo en el entorno de desarrollo
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('morgan habilitado...');    
}

//const port = 3000;
//variables de entorno
const port = process.env.PORT || 3000; //En las variables de entorno toma el PORT sino existe el valor será 3000
//crear la variable de entorno en el cmd
//windows: set PORT=5000

const resListen = ()=> console.log(`escuchando en el puerto http://localhost:${port}/`);
// metodos
// app.delete
// app.put
// app.post //etc

// Levantar servidor
// '/', ruta

app.get('/', function(req, res) {
    // tanto req como res, tienen varios metodos disponibles
    //send (enviar informacion al servidor)
    res.send('Hola mundo');
});

//rutas de los usuarios


// En que puerto estará escuchando el servidor
app.listen(port, resListen)