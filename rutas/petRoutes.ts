import { Router, Request, Response} from "express";

import { Pet } from "../modelos/pet";

const petRouter = Router();

//Crear Pet
petRouter.post('/crear',(req: Request,res: Response)=>{
    const picture = req.file;
    const pet = {
        name: req.body.name,
        race: req.body.race,
        gender: req.body.gender,
        traits: req.body.traits,
        picture: picture.filename,
    };
    console.log(picture);
//Grabar PET en BD
    /*Pet.create(pet).then(petBD => {
        res.json({
            ok: true,
            pet:petBD
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })*/
});

//Ver pets
petRouter.get('/todos',(req: Request,res: Response)=>{
    Pet.find({specialty: req.query.type}).then(function(pet) {
        res.json(pet);
    }).catch(function(error){
        console.log("Error al mostrar las mascotas" + error);
    });
});

export default petRouter;