"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direccion = void 0;
var mongoose_1 = require("mongoose");
var direccionSchema = new mongoose_1.Schema({
    nombresDestinatario: {
        type: String,
        required: [true, 'El nombre del destinario es obligatorio']
    },
    telefonoContacto: {
        type: String,
        required: [true, "El teléfono del contacto es obligatorio"]
    },
    ciudad: {
        type: String,
        required: [true, "La ciudad de la dirección es obligatoria"]
    },
    direccion: {
        type: String,
        required: [true, "La dirección es obligatoria"]
    },
    direccionAdicional: {
        type: String,
    },
    predeterminado: {
        type: Boolean,
        required: [true, "Dato predeterminado es obligatorio"]
    },
    idCliente: {
        type: String,
        required: [true, "El idCliente es obligatorio"]
    }
});
exports.Direccion = mongoose_1.model('Direccion', direccionSchema);
