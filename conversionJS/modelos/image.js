"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagen = void 0;
var mongoose_1 = require("mongoose");
var imagenSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    }
});
exports.Imagen = mongoose_1.model('Imagen', imagenSchema);
