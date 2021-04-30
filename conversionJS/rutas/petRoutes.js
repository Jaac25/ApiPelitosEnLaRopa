"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pet_1 = require("../modelos/pet");
var petRouter = express_1.Router();
//Crear Pet
petRouter.post('/crear', function (req, res) {
    var nameReq = req.body.name;
    var raceReq = req.body.race;
    var genderReq = req.body.gender;
    var traitReq = req.body.traits;
    var lostReq = req.body.lost;
    var adoptReq = req.body.adopt;
    var picture = req.file;
    var pet = {
        name: nameReq,
        race: raceReq,
        gender: genderReq,
        traits: traitReq,
        lost: lostReq,
        adopt: adoptReq,
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
petRouter.delete('/eliminar', function (req, res) {
    var idPet = req.body.idPet;
    pet_1.Pet.deleteOne({ _id: idPet }).then(function (petDB) {
        if (petDB["deletedCount"] == 0) {
            res.json({
                ok: false,
                msg: "No se pudo borrar la mascota"
            });
        }
        else {
            res.json({
                ok: true,
                pet: petDB
            });
        }
    }).catch(function (err) {
        res.json({
            ok: false,
            msg: "No se pudo borrar la mascota"
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
