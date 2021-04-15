"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajador = void 0;
var mongoose_1 = require("mongoose");
var trabajadorSchema = new mongoose_1.Schema({
    nombres: {
        type: String,
        required: [true, 'Tu nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, "Tu apellido es obligatorio"]
    },
    documento: {
        type: String,
        unique: true,
        required: [true, "Tu número de documento es obligatorio"]
    },
    telefono: {
        type: String,
        unique: true,
        required: [true, "Tu número de teléfono es obligatorio"]
    },
    ciudad: {
        type: String,
        required: [true, "El nombre de tu ciudad de ubicación es obligatorio"]
    },
    direccion: {
        type: String,
        required: [true, "Tu dirección de residencia es obligatoria"]
    },
    correo: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Tu correo es obligatorio"]
    },
    foto: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Tu contraseña es obligatoria"]
    },
    fotoCedula: {
        type: String,
        required: [true, "Tu foto de cédula es obligatoria"]
    },
    nombresRP1: {
        type: String,
        required: [true, "Nombres referencia personal 1"]
    },
    apellidosRP1: {
        type: String,
        required: [true, "Apellidos referencia personal 1"]
    },
    documentoRP1: {
        type: String,
        required: [true, "Documento referencia personal 1"]
    },
    celularRP1: {
        type: String,
        required: [true, "Celular referencia personal 1"]
    },
    nombresRP2: {
        type: String,
        required: [true, "Nombres referencia personal 2"]
    },
    apellidosRP2: {
        type: String,
        required: [true, "Apellidos referencia personal 2"]
    },
    documentoRP2: {
        type: String,
        required: [true, "Documento referencia personal 2"]
    },
    celularRP2: {
        type: String,
        required: [true, "Celular referencia personal 2"]
    },
});
exports.Trabajador = mongoose_1.model('Trabajador', trabajadorSchema);
