const express = require('express');
const app = express();

//const port = 3000;
//variables de entorno
const port = process.env.PORT || 3000; //En las variables de entorno toma el PORT sino existe el valor será 3000
//crear la variable de entorno en el cmd
//windows: set PORT=5000

const usuarios = [
    { id: 1, nombre: 'Pablo'},
    { id: 2, nombre: 'Daniel'},
    { id: 3, nombre: 'Yostin'},
    { id: 4, nombre: 'Selvin'}
]

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
    res.send(usuarios)
})

// **Get
app.get('/api/usuarios/:id', (req, res)=>{
    const id = req.params.id;
    let usuario = usuarios.find(u => u.id === parseInt(id));

    // Si el usuario no exitste, retorname el error 404
    if (!usuario) res.status(404).send('El usario no fue econtrado')
    // /api/usuarios/6

    // Si fue encontrado el usuarios, retorname el usuario
    res.send(usuario)
    // /api/usuarios/1
})

// En que puerto estará escuchando el servidor
app.listen(port, resListen)