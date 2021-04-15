"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
var mongoose_1 = require("mongoose");
var categoriaSchema = new mongoose_1.Schema({
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
        required: [true, "La portada es obligatoria"]
    },
});
exports.Categoria = mongoose_1.model('Categoria', categoriaSchema);
