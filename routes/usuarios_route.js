const express = require('express');
const ruta = express.Router();

//Modelos
const Usuarios = require('../models/usuarios_model');

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
        }));
})
//?GET
ruta.get('/', (req, res)=>{
    const usuarios = listarUsuarios();

    usuarios
        .then( usuarios => {res.json({usuarios: usuarios})})
        .catch( e => {res.status(400).json({
            error: e
        })});
})

//?PUT
ruta.put('/:id', (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const resultado = editarUsuario(id, body);
    
    resultado
        .then( usuario => {res.json({usuario: usuario})})
        .catch( e => {res.status(400).json({
            error: e
        })});
})

//?DELETE (desactivar usuario)
ruta.delete('/:id', (req, res)=>{
    const id = req.params.id;
    const resultado = desactivarUsuario(id);
    
    resultado
        .then( usuario => {res.json({usuario: usuario})})
        .catch( e => {res.status(400).json({
            error: e
        })});
})


//*****CRUD USUARIOS
//?POST
//Funcion para guardar dato (body, los datos enviados por el cliente)
const crearUsuario = async ({email, nombre, password}) =>{
    // Creando el usuario en base al modelo
    const usuario = new Usuarios({email, nombre, password}) // los demas campos no son requeridos

    try {
        const res = await usuario.save(); // Guardarlo en mongodb
        return res;
    } catch (e) {
        throw e;
    }
}

//?GET
const listarUsuarios = async ()=>{
    try {
        const usuarios = await Usuarios.find({estado:true})
        return usuarios;
    } catch (e) {
        throw e;
    }
}

//?PUT
const editarUsuario = async (id, {nombre, email, password}) => {
    try {
        const res = await Usuarios.findByIdAndUpdate({_id: id},{
            $set: {
                nombre,
                email,
                password
            }
        }, { new:true }); 
        return res;

    } catch (e) {
        throw e;
    }
}

//?DELETE (desactivar usuario)
const desactivarUsuario = async id => {
    try {
        const res = await Usuarios.findByIdAndUpdate({_id: id},{
            $set: {
                estado: false
            }
        }, { new:true }); 
        return res;

    } catch (e) {
        throw e;
    }
}

//Exportar todas las rutar
module.exports = ruta;