"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
var mongoose_1 = require("mongoose");
var petsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la mascota es obligatorio']
    },
    race: {
        type: String,
        required: [true, "El tipo de mascota es obligatorio"]
    },
    gender: {
        type: String,
        required: [true, "El genero es obligatorio"]
    },
    traits: {
        type: String,
    },
    lost: {
        type: Boolean,
        required: [true, "Es obligatorio saber si está perdidoo no"],
    },
    adopt: {
        type: Boolean,
        required: [true, "Es obligatorio saber si está en adopción o no"],
    },
    picture: {
        name: String,
        path: String,
    },
});
exports.Pet = mongoose_1.model('Pet', petsSchema);
