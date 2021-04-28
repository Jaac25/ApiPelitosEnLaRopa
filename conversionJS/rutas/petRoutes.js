"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pet_1 = require("../modelos/pet");
var petRouter = express_1.Router();
//Crear Pet
petRouter.post('/crear', function (req, res) {
    var picture = req.file;
    var pet = {
        name: req.body.name,
        race: req.body.race,
        gender: req.body.gender,
        traits: req.body.traits,
        picture: picture.filename,
    };
    //console.log(picture);
    //Grabar PET en BD
    pet_1.Pet.create(pet).then(function (petBD) {
        res.json({
            ok: true,
            pet: petBD
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver pets
petRouter.get('/todos', function (req, res) {
    pet_1.Pet.find({ specialty: req.query.type }).then(function (pet) {
        res.json(pet);
    }).catch(function (error) {
        console.log("Error al mostrar las mascotas" + error);
    });
});
exports.default = petRouter;
