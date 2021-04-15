"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habilidad = void 0;
var mongoose_1 = require("mongoose");
var habilidadSchema = new mongoose_1.Schema({
    nombre: {
        unique: true,
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    portada: {
        type: String,
    },
    idCategoria: {
        type: String,
        required: [true, "El idCategoria es obligatorio"]
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    }
});
exports.Habilidad = mongoose_1.model('Habilidad', habilidadSchema);
