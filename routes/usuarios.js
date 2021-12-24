const express = require('express');
const ruta = express.Router();

// Modulo para validacion de datos
const Joi = require('joi');

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

// **Get
ruta.get('/:id', (req, res)=>{
    const id = req.params.id;
    let usuario = usuarioExiste(id);

    // Si el usuario no exitste, retorname el error 404
    if (!usuario) res.status(404).send('El usario no fue econtrado :c')
    // /api/usuarios/6

    // Si fue encontrado el usuarios, retorname el usuario
    res.send(usuario)
    // /api/usuarios/1
})

// **Post
// la ruta es igual a la de get, pero el metodo cambia
ruta.post('/', (req, res)=>{
    const autoId = usuarios.length + 1;
    const nombre = req.body.nombre; // al usar el express.json(), este formatea a json el nombre

    const { error, value } = validarNombre(nombre);

    //Si no existe algun error en la validacion
    if (!error) {
        const usuario = {
            id: autoId,
            nombre: value.nombre
        }
    
        usuarios.push(usuario); //Agregando el usuario al array
        res.send(`El usuario fue creado: \n ${JSON.stringify(usuario)}`);
    } else{
        // capturar el mensaje de error
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
})

// **Put
ruta.put('/:id', (req, res)=>{
    const id = req.params.id;
    const nombre = req.body.nombre; // al usar el express.json(), este formatea a json el nombre

    let usuario = usuarioExiste(id);

    // Si el usuario no exitste, retorname el error 404
    if (!usuario) res.status(404).send('El usario no fue econtrado');

    const { error, value } = validarNombre(nombre);

    //Si existe algun error en la validacion
    if (error) {
       // capturar el mensaje de error
       const mensaje = error.details[0].message;
       res.status(400).send(mensaje);
       return;
    }

    // modificar el dato
    usuario.nombre = value.nombre;
    res.send(usuario);
})

// **Delete
ruta.delete('/:id', (req, res)=>{
    const id = req.params.id;

    let usuario = usuarioExiste(id);

    // Si el usuario no exitste, retorname el error 404
    if (!usuario) res.status(404).send('El usario no fue econtrado o ya ha sido eliminado');

    // Buscar el usuario por su indicie
    const index = usuarios.indexOf(usuario);
    // al array de usuarios eliminar el index (solo eliminar 1 registro)
    usuarios.splice(index, 1);

    res.send(`El usuario fue eliminaro: \n ${JSON.stringify(usuario)}`);
})

// Validacion si el usuario existe
const usuarioExiste = _id =>{
    return usuarios.find(u => u.id === parseInt(_id));
}

// Validacion de los campos del usuario
const validarNombre = _nombre => {
    // Crear un shcema para las validaciones
    // que sea: string, minimo 3 caracteres, maximo 30 caracteres y que sea requerido (no este en blanco)
    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .max(30)
            .required(),
    });

    // validar el campo nombre
    return schema.validate({ nombre: _nombre });
}

//Exportar todas las rutar
module.exports = ruta;