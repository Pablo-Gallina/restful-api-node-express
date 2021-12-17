const express = require('express');
const app = express();

// Modulo para validacion de datos
const Joi = require('joi');

// Usar un middleware para dar formato json
app.use(express.json())

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

// **Post
// la ruta es igual a la de get, pero el metodo cambia
app.post('/api/usuarios', (req, res)=>{
    const autoId = usuarios.length + 1;
    const nombre = req.body.nombre; // al usar el express.json(), este formatea a json el nombre

    // Crear un shcema para las validaciones
    // que sea: string, minimo 3 caracteres, maximo 30 caracteres y que sea requerido (no este en blanco)
    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .max(30)
            .required(),
    });

    // validar el campo nombre
    const { error, value } = schema.validate({ nombre: nombre });

    //Si no existe algun error en la validacion
    if (!error) {
        const usuario = {
            id: autoId,
            nombre: value.nombre
        }
    
        usuarios.push(usuario); //Agregando el usuario al array
        res.send(`El suario fue creado: \n ${JSON.stringify(usuario)}`);
    } else{
        // capturar el mensaje de error
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
})

// En que puerto estará escuchando el servidor
app.listen(port, resListen)