const express = require('express');
const ruta = express.Router();

//Modelos
const Cursos = require('../models/cursos_model');

//Esquemas (schema)
const schema = require('../schema/cursos_schema');

// Middlewares
const verificarToken = require('../middlewares/auth_middleware');

// ****CRUD RUTAS
//?POST
ruta.post('/', verificarToken, (req, res)=>{
    const { titulo, descripcion, imagen } = req.body;

    // Validacion de datos por medio del modulo JOI (esquema)
    const { error, value } = schema.validate({ titulo, descripcion, imagen });

    // Si existe algun error, retornar el error
    if (error) return res.status(404).send(error);

    const resultado = crearCurso(value); // Creando el curso

    // Verificar si el curso fue creado
    resultado
        .then( curso => res.json({curso: curso}))
        .catch( e => res.status(400).json({
            error: e
        }));
})

//?GET
ruta.get('/', verificarToken, (req, res)=>{
    const curso = listarCursos();

    curso
        .then( curso => {res.json({curso})})
        .catch( e => {res.status(400).json({
            error: e
        })});
})

//?PUT
ruta.put('/:id', verificarToken, (req, res)=>{
    const id = req.params.id;
    const { titulo, descripcion, imagen } = req.body;

    // Validacion de datos por medio del modulo JOI (esquema)
    const { error, value } = schema.validate({ titulo, descripcion, imagen });

    // Si existe algun error, retornar el error
    if (error) return res.status(404).send(error);

    const resultado = editarCurso(id, value);
    
    resultado
        .then( curso => {res.json({curso})})
        .catch( e => {res.status(400).json({
            error: e
        })});
})

//?DELETE (desactivar usuario)
ruta.delete('/:id', verificarToken, (req, res)=>{
    const id = req.params.id;
    const resultado = desactivarCurso(id);
    
    resultado
        .then( curso => {res.json({curso})})
        .catch( e => {res.status(400).json({
            error: e
        })});
})


//*****CRUD USUARIOS
//?POST
//Funcion para guardar dato (body, los datos enviados por el cliente)
const crearCurso = async ({ titulo, descripcion, imagen }) =>{
    // Creando el curso en base al modelo
    const curso = new Cursos({ titulo, descripcion, imagen }) // los demas campos no son requeridos

    try {
        const res = await curso.save(); // Guardarlo en mongodb
        return res;
    } catch (e) {
        throw e;
    }
}

//?GET
const listarCursos = async ()=>{
    try {
        const cursos = await Cursos.find({estado:true})
        return cursos;
    } catch (e) {
        throw e;
    }
}

//?PUT
const editarCurso = async (id, { titulo, descripcion, imagen }) => {
    try {
        const res = await Cursos.findByIdAndUpdate({_id: id},{
            $set: {
                titulo,
                descripcion,
                imagen
            }
        }, { new:true }); 
        return res;

    } catch (e) {
        throw e;
    }
}

//?DELETE (desactivar curso)
const desactivarCurso = async id => {
    try {
        const res = await Cursos.findByIdAndUpdate({_id: id},{
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