const mongoose = require('mongoose');
// Desestrucutrando shema de mongoose
const { Schema } = mongoose;

// Creando el esquema
const cursoSchema = new Schema({
    titulo: {
        type:String,
        required: true
    },
    autor:{
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    descripcion: {
        type:String,
        required:false
    },    
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false        
    },
    alumnos: {
        type: Number,
        default: 0
    },
    califica: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Curso', cursoSchema);