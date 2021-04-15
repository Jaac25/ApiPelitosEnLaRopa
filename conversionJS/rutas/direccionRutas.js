"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var direccion_1 = require("../modelos/direccion");
var direccionRutas = express_1.Router();
//Crear DIRECCIOn
direccionRutas.post('/crear', function (req, res) {
    var direccion = {
        nombresDestinatario: req.body.nombresDestinatario,
        telefonoContacto: req.body.telefonoContacto,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        direccionAdicional: req.body.direccionAdicional,
        predeterminado: req.body.predeterminado,
        idCliente: req.body.idCliente
    };
    //Grabar DIRECCION en BD
    direccion_1.Direccion.create(direccion).then(function (direccionDB) {
        res.json({
            ok: true,
            direccion: direccionDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Cambiar direccion predeterminada
direccionRutas.post('/modificar', function (req, res) {
    var direccion = {
        nombresDestinatario: req.body.nombresDestinatario,
        telefonoContacto: req.body.telefonoContacto,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        direccionAdicional: req.body.direccionAdicional,
    };
    direccion_1.Direccion.findByIdAndUpdate(req.body.idDireccion, direccion, { new: true }, function (err, direccionDB) {
        if (err)
            throw err;
        if (!direccionDB) {
            return res.json({
                ok: false,
                mensaje: 'Error al modificar la dirección'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Dirección modificada correctamente'
        });
    });
});
//Ver direcciones de cliente
direccionRutas.get('/buscar/:documento', function (req, res) {
    direccion_1.Direccion.find({ idCliente: req.params.documento }).then(function (direccion) {
        res.json(direccion);
    }).catch(function (error) {
        console.log("Error al mostrar las direcciones del cliente" + error);
    });
});
//Cambiar direccion predeterminada
direccionRutas.post('/predeterminado', function (req, res) {
    var direccion = {
        predeterminado: req.body.predeterminado,
    };
    direccion_1.Direccion.findByIdAndUpdate(req.body.idDireccion, direccion, { new: true }, function (err, direccionDB) {
        if (err)
            throw err;
        if (!direccionDB) {
            return res.json({
                ok: false,
                mensaje: 'Error al cambiar la dirección predeterminada'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Cambio de dirección predeterminada'
        });
    });
});
//Ver direccion predeterminada
direccionRutas.get('/direccionPredeterminada/:documento', function (req, res) {
    direccion_1.Direccion.findOne({ idCliente: req.params.documento, predeterminado: true }).then(function (direccion) {
        res.json({
            "ok": true,
            "direccion": direccion
        });
    }).catch(function (error) {
        res.json({
            "ok": false,
            "direccion": null
        });
        console.log("Error al encontrar la direccion predeterminada" + error);
    });
});
exports.default = direccionRutas;
