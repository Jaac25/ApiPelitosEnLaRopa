"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabilidadesTrabajador = void 0;
var mongoose_1 = require("mongoose");
var habilidadesTrabajadorSchema = new mongoose_1.Schema({
    idHabilidadesTrabajador: {
        type: String,
        unique: true,
        required: [true, 'El idHabilidadesTrabajador es obligatorio']
    },
    idTrabajador: {
        type: String,
        required: [true, "El id del trabajador es obligatorio"]
    },
    idHabilidad: {
        type: String,
        required: [true, "El id de la habilidad es obligatorio"]
    }
});
exports.HabilidadesTrabajador = mongoose_1.model('HabilidadesTrabajador', habilidadesTrabajadorSchema);
