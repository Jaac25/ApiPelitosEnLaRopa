"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var habilidadesTrabajador_1 = require("../modelos/habilidadesTrabajador");
var habilidadesTrabajadorRutas = express_1.Router();
//Crear Habilidad
habilidadesTrabajadorRutas.post('/crear', function (req, res) {
    var habilidadesTrabajador = {
        idHabilidadesTrabajador: req.body.habilidadesTrabajador,
        idTrabajador: req.body.idTrabajador,
        idHabilidad: req.body.idHabilidad,
    };
    //Grabar CATEGORIA en BD
    habilidadesTrabajador_1.HabilidadesTrabajador.create(habilidadesTrabajador).then(function (habilidadesTrabajadorDB) {
        res.json({
            ok: true,
            habilidadesTrabajador: habilidadesTrabajadorDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver Categorias
habilidadesTrabajadorRutas.get('/todos', function (req, res) {
    habilidadesTrabajador_1.HabilidadesTrabajador.find({ specialty: req.query.type }).then(function (habilidadesTrabajador) {
        res.json(habilidadesTrabajador);
    }).catch(function (error) {
        console.log("Error al mostrar las habilidadesTrabajador" +
            error);
    });
});
exports.default = habilidadesTrabajadorRutas;
