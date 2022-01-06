const mongoose = require('mongoose');
// Desestrucutrando shema de mongoose
const { Schema } = mongoose;

// Creando el esquema
const usuarioSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    nombre: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false        
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);