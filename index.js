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

// En que puerto estará escuchando el servidor
app.listen(port, resListen)