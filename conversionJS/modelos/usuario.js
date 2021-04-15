"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var usuarioSchema = new mongoose_1.Schema({
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
});
usuarioSchema.method("compararContrasena", function (password) {
    if (password === void 0) { password = ''; }
    if (bcryptjs_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
