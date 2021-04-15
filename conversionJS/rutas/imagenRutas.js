"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var imagen_1 = require("../modelos/imagen");
var imagenRutas = express_1.Router();
//Crear Categoria
imagenRutas.post('/crear', function (req, res) {
    var imagen = {
        nombres: req.body.nombres,
    };
    var image = new imagen_1.Imagen(imagen);
    image.save(function (err) {
        if (!err) {
            res.redirect("/imagenes/" + image._id);
        }
        else {
            res.render(err);
        }
    });
});
imagenRutas.get("/imagenes/:id", function (req, res) {
    imagen_1.Imagen.findById(req.params.id, function (err, image) {
        res.render("/imagenes/show", { Imagen: imagen_1.Imagen, image: image });
    });
});
