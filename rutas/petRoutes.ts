import { Router, Request, Response} from "express";

import { Pet } from "../modelos/pet";

const petRouter = Router();
const fs = require('fs-extra');

//Crear Pet
petRouter.post('/crear',(req: Request,res: Response)=>{
    const nameReq: string = req.body.name;
    const raceReq: string = req.body.race;
    const genderReq: string = req.body.gender;
    const traitReq: string = req.body.traits;
    const lostReq: boolean = req.body.lost;
    const adoptReq: boolean = req.body.adopt;

    const picture = req.file;
    const pet = {
        name: nameReq,
        race: raceReq,
        gender: genderReq,
        traits: traitReq,
        lost: lostReq,
        adopt: adoptReq,
        picture: {
            name: picture.filename,
            path: picture.path,
        },
    };
    //console.log(picture);
//Grabar PET en BD
    Pet.create(pet).then((petBD: any) => {
        res.json({
            ok: true,
            pet:petBD
        })
    }).catch((err: any) => {
        res.json({
            ok: false,
            err
        })
    })
});

petRouter.delete('/eliminar', (req:Request,res:Response) => {
    var idPet:string = req.body.idPet;
    Pet.findOneAndDelete({_id: idPet}).then(async (petDB: any) => {
        if(!petDB){
            res.json({
                ok: false,
                msg: "No se encontró la mascota"
            })
        }else{
            await fs.unlink(petDB.picture.path);
            res.json({
                ok: true,
                pet:petDB
            })
        }
    }).catch((err: any) => {
        res.json({
            ok: false,
            msg: "No se pudo borrar la mascota"
        })
    })
});

//Ver pets
petRouter.get('/todos',(req: Request,res: Response)=>{
    Pet.find({specialty: req.query.type}).then(function(pet: any) {
        res.json(pet);
    }).catch(function(error: string){
        console.log("Error al mostrar las mascotas" + error);
    });
});

export default petRouter;