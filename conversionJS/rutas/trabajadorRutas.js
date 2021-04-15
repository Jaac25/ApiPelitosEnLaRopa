"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var trabajador_1 = require("../modelos/trabajador");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var trabajadorRutas = express_1.Router();
//Crear Categoria
trabajadorRutas.post('/crear', function (req, res) {
    var trabajador = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        telefono: req.body.telefono,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        correo: req.body.correo,
        foto: req.body.foto,
        password: bcryptjs_1.default.hashSync(req.body.password, 10),
        fotoCedula: req.body.fotoCedula,
        disponible: req.body.disponible,
        nombresRP1: req.body.nombresRP1,
        apellidosRP1: req.body.apellidosRP1,
        documentoRP1: req.body.documentoRP1,
        celularRP1: req.body.celularRP1,
        nombresRP2: req.body.nombresRP2,
        apellidosRP2: req.body.apellidosRP2,
        documentoRP2: req.body.documentoRP2,
        celularRP2: req.body.celularRP2,
    };
    //Grabar CATEGORIA en BD
    trabajador_1.Trabajador.create(trabajador).then(function (trabajadorDB) {
        res.json({
            ok: true,
            trabajador: trabajadorDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver Categorias
trabajadorRutas.get('/todos', function (req, res) {
    trabajador_1.Trabajador.find({ specialty: req.query.type }).then(function (trabajador) {
        res.json(trabajador);
    }).catch(function (error) {
        console.log("Error al mostrar los trabajadores" + error);
    });
});
exports.default = trabajadorRutas;
