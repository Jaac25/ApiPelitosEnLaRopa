"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoria_1 = require("../modelos/categoria");
var categoriaRutas = express_1.Router();
//Crear Categoria
categoriaRutas.post('/crear', function (req, res) {
    var categoria = {
        idCategoria: req.body.idCategoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        portada: req.body.portada,
    };
    //Grabar CATEGORIA en BD
    categoria_1.Categoria.create(categoria).then(function (categoriaDB) {
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver Categorias
categoriaRutas.get('/todos', function (req, res) {
    categoria_1.Categoria.find({ specialty: req.query.type }).then(function (categoria) {
        res.json(categoria);
    }).catch(function (error) {
        console.log("Error al mostrar las categorias" + error);
    });
});
//BuscarCategoria
categoriaRutas.post('/buscar', function (req, res) {
    var idCategoria = req.body.idCategoria;
    categoria_1.Categoria.findOne({ _id: idCategoria }, function (err, categoriaDB) {
        if (err)
            throw err;
        if (!categoriaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado la categoria'
            });
        }
        else {
            return res.json({
                "ok": true,
                "categoria": categoriaDB
            });
        }
    });
});
exports.default = categoriaRutas;
