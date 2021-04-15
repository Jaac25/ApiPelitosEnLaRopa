"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var habilidad_1 = require("../modelos/habilidad");
var habilidadRutas = express_1.Router();
//Crear habilidad
habilidadRutas.post('/crear', function (req, res) {
    var habilidad = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        portada: req.body.portada,
        idCategoria: req.body.idCategoria,
        precio: req.body.precio,
    };
    //Grabar HABILIDAD en BD
    habilidad_1.Habilidad.create(habilidad).then(function (habilidadDB) {
        res.json({
            ok: true,
            habilidad: habilidadDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver todas habilidades
habilidadRutas.get('/todos', function (req, res) {
    habilidad_1.Habilidad.find({ specialty: req.query.type }).then(function (habilidad) {
        res.json(habilidad);
    }).catch(function (error) {
        console.log("Error al mostrar las habilidades" + error);
    });
});
//Ver habilidades de categoria
habilidadRutas.get('/categoria/:idCategoria', function (req, res) {
    habilidad_1.Habilidad.find({ idCategoria: req.params.idCategoria }).then(function (habilidad) {
        res.json(habilidad);
    }).catch(function (error) {
        console.log("Error al mostrar las habilidades" + error);
    });
});
//Metodos buscar 
habilidadRutas.post('/buscar', function (req, res) {
    var idHabilidad = req.body.idHabilidad;
    habilidad_1.Habilidad.findOne({ _id: idHabilidad }, function (err, habilidadDB) {
        if (err)
            throw err;
        if (!habilidadDB) {
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado la habilidad'
            });
        }
        else {
            return res.json({
                "ok": true,
                "habilidad": habilidadDB
            });
        }
    });
});
exports.default = habilidadRutas;
