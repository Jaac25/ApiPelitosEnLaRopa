import { Router, Request, Response} from "express";
import {Usuario} from '../modelos/usuario';

import bcrypt from 'bcryptjs';
import Token from "../clases/token";
import { verificarToken } from "../middelwares/autentificacion"; 

const usuarioRutas = Router();

//Crear Usuario
usuarioRutas.post('/crear',(req: Request,res: Response)=>{
    const usuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        rol: req.body.rol,
        telefono: req.body.telefono,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        correo: req.body.correo,
        foto: req.body.foto,
        password: bcrypt.hashSync(req.body.password,10)
    };
    
//Grabar USUARIO en BD
    Usuario.create(usuario).then(usuarioDB => {
        res.json({
            ok: true,
            usuario:usuarioDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })
});
//Ver usuarios
usuarioRutas.get('/todos',(req: Request,res: Response)=>{
    Usuario.find({specialty: req.query.type}).then(function(usuario) {
        res.json(usuario);
    }).catch(function(error){
        console.log("Error al mostrar los usuarios" + error);
    });
});

//Login
usuarioRutas.post('/entrar',(req: Request,res: Response)=>{
    const body = req.body;
    Usuario.findOne({correo: body.correo},(err,usuarioDB) => {
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
            console.log(miToken);
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
    const usuario = {
        nombres: req.body.nombres || req.usuario.nombres,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        documento: req.body.documento || req.usuario.documento,
        telefono: req.body.telefono || req.usuario.telefono,
        ciudad: req.body.ciudad || req.usuario.ciudad,
        direccion: req.body.direccion || req.usuario.direccion,
        correo: req.body.correo || req.usuario.correo,
        foto: req.body.foto || req.usuario.foto,
        password: bcrypt.hashSync(req.body.password,10) || bcrypt.hashSync(req.usuario.password,10)
    }
    Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err) throw err;
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
    Usuario.findOne({_id: documento},(err,usuarioDB) => {
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

//Metodos buscar 
usuarioRutas.post('/bCorreo', (req: any, res: Response) => {
    var correo = req.body.correo;
    Usuario.findOne({correo: correo},(err,usuarioDB) => {
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