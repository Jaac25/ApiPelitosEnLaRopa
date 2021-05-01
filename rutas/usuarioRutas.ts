import { Router, Request, Response} from "express";
import {Usuario} from '../modelos/usuario';

import bcrypt from 'bcryptjs';
import Token from "../clases/token";
import { verificarToken } from "../middelwares/autentificacion"; 

const usuarioRutas = Router();

//Crear Usuario
usuarioRutas.post('/crear',(req: Request,res: Response)=>{
    const nombresReq: string = req.body.nombres;
    const apellidosReq: string = req.body.apellidos;
    const documentoReq: string = req.body.documento;
    const rolReq: string = req.body.rol;
    const telefonoReq : string = req.body.telefono;
    const ciudadReq : string = req.body.ciudad;
    const direccionReq : string = req.body.direccion;
    const correoReq : string = req.body.correo;
    const passwordReq : string = req.body.password;

    const usuario = {
        nombres: nombresReq,
        apellidos: apellidosReq,
        documento: documentoReq,
        rol: rolReq,
        telefono: telefonoReq,
        ciudad: ciudadReq,
        direccion: direccionReq,
        correo: correoReq,
        password: bcrypt.hashSync(passwordReq,10)
    };
    
//Grabar USUARIO en BD
    Usuario.create(usuario).then((usuarioDB: any) => {
        res.json({
            ok: true,
            usuario:usuarioDB
        })
    }).catch((err: any) => {
        res.json({
            ok: false,
            err
        })
    })
});
//Ver usuarios
usuarioRutas.get('/todos',(req: Request,res: Response)=>{
    Usuario.find({specialty: req.query.type}).then(function(usuario:any) {
        res.json(usuario);
    }).catch(function(error:any){
        console.log("Error al mostrar los usuarios" + error);
    });
});

//Login
usuarioRutas.post('/entrar',(req: Request,res: Response)=>{
    const body = req.body;
    Usuario.findOne({correo: body.correo},(err:any,usuarioDB:any) => {
        if(err) throw err;
        if(!usuarioDB){
            return res.json({
                ok: false,
                token: "Parece que las credenciales son incorrectas"
            });
        }
        if(usuarioDB.compararContrasena(body.password)){
            const miToken= Token.getToken({
                _id: usuarioDB._id,
                correo: usuarioDB.correo,
                password: usuarioDB.password
            });
            res.json({
                ok: true,
                token: miToken
            });
        }else{
            res.json({
                ok: false,
                token: "Parece que las credenciales son incorrectas"
            })
        }
    });
});

//Actualizar Token
usuarioRutas.post('/actualizar', verificarToken, (req: any, res: Response) => {
    const nombresReq: string = req.body.nombres || req.usuario.nombres;
    const apellidosReq: string = req.body.apellidos || req.usuario.apellidos;
    const documentoReq: string = req.body.documento || req.usuario.documento;
    const rolReq: string = req.body.rol || req.usuario.rol;
    const telefonoReq : string = req.body.telefono || req.usuario.telefono;
    const ciudadReq : string = req.body.ciudad || req.usuario.ciudad;
    const direccionReq : string = req.body.direccion || req.usuario.direccion;
    const correoReq : string = req.body.correo || req.usuario.correo;
    const passwordReq : string = req.body.password || req.usuario.password;
    const usuario = {
        nombres: nombresReq,
        apellidos: apellidosReq,
        documento: documentoReq,
        rol: rolReq,
        telefono: telefonoReq,
        ciudad: ciudadReq,
        direccion: direccionReq,
        correo: correoReq,
        password: bcrypt.hashSync(passwordReq,10)
    }
    Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err) {
            return res.json({
                ok: false,
                mensaje: 'Datos inválidos'
            });
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Datos inválidos'
            });
        }
        const miToken = Token.getToken({
            _id: userDB._id,
            correo: userDB.correo,
            password: userDB.password
        });
        res.json({
            ok: true,
            token: miToken
        });
    });
});

//Obtener usuario
usuarioRutas.get('/mostrar', verificarToken, (req: any, res: Response) => {
    var documento = req.usuario._id;
    Usuario.findOne({_id: documento},(err: any,usuarioDB: any) => {
        if(err) throw err;
        if(!usuarioDB){
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado el usuario'
            });
        }else{
            return res.json({
                "ok": true,
                "usuario": usuarioDB
            });
        }
    });
});

export default usuarioRutas;