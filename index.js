var express = require('express');
var app = express();

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

//otras rutas
app.get('/api/usuarios', (req, res)=>{
    res.send([{ 'Usuario':'Pablo' },{ 'Usuario':'Daniel'}, { 'Usuario':'Yostin' }])
})

//Rutas con parámetros (1 parámetro)
//le indicamos a node que hay un parametro con :
app.get('/api/usuarios/:id', (req, res)=>{
    const parametros = req.params.id;
    res.send(parametros)
    // /api/usuarios/15
})

//Rutas con parámetros (varios parametros)
app.get('/api/usuarios/:edad/:pais', (req, res)=>{
    const edad = req.params.edad;
    const pais = req.params.pais;
    //res.send(edad+ " "+ pais)
    res.send(req.params);
    // /api/usuarios/14/guate
})

//Utilizando query strings
app.get('/api/query/', (req, res)=>{
    const queryStrings = req.query;
    res.send(queryStrings)
    // /api/query/?var=5
})

// En que puerto estará escuchando el servidor
app.listen(port, resListen)