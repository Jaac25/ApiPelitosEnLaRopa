"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_1 = require("../modelos/usuario");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var token_1 = __importDefault(require("../clases/token"));
var autentificacion_1 = require("../middelwares/autentificacion");
var usuarioRutas = express_1.Router();
//Crear Usuario
usuarioRutas.post('/crear', function (req, res) {
    var usuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        rol: req.body.rol,
        telefono: req.body.telefono,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        correo: req.body.correo,
        foto: req.body.foto,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    //Grabar USUARIO en BD
    usuario_1.Usuario.create(usuario).then(function (usuarioDB) {
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Ver usuarios
usuarioRutas.get('/todos', function (req, res) {
    usuario_1.Usuario.find({ specialty: req.query.type }).then(function (usuario) {
        res.json(usuario);
    }).catch(function (error) {
        console.log("Error al mostrar los usuarios" + error);
    });
});
//Login
usuarioRutas.post('/entrar', function (req, res) {
    var body = req.body;
    usuario_1.Usuario.findOne({ correo: body.correo }, function (err, usuarioDB) {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                token: "Parece que las credenciales son incorrectas"
            });
        }
        if (usuarioDB.compararContrasena(body.password)) {
            var miToken = token_1.default.getToken({
                _id: usuarioDB._id,
                correo: usuarioDB.correo,
                password: usuarioDB.password
            });
            console.log(miToken);
            res.json({
                ok: true,
                token: miToken
            });
        }
        else {
            res.json({
                ok: false,
                token: "Parece que las credenciales son incorrectas"
            });
        }
    });
});
//Actualizar Token
usuarioRutas.post('/actualizar', autentificacion_1.verificarToken, function (req, res) {
    var usuario = {
        nombres: req.body.nombres || req.usuario.nombres,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        documento: req.body.documento || req.usuario.documento,
        telefono: req.body.telefono || req.usuario.telefono,
        ciudad: req.body.ciudad || req.usuario.ciudad,
        direccion: req.body.direccion || req.usuario.direccion,
        correo: req.body.correo || req.usuario.correo,
        foto: req.body.foto || req.usuario.foto,
        password: bcryptjs_1.default.hashSync(req.body.password, 10) || bcryptjs_1.default.hashSync(req.usuario.password, 10)
    };
    usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Datos inválidos'
            });
        }
        var miToken = token_1.default.getToken({
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
usuarioRutas.get('/mostrar', autentificacion_1.verificarToken, function (req, res) {
    var documento = req.usuario._id;
    usuario_1.Usuario.findOne({ _id: documento }, function (err, usuarioDB) {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado el usuario'
            });
        }
        else {
            return res.json({
                "ok": true,
                "usuario": usuarioDB
            });
        }
    });
});
//Metodos buscar 
usuarioRutas.post('/bCorreo', function (req, res) {
    var correo = req.body.correo;
    usuario_1.Usuario.findOne({ correo: correo }, function (err, usuarioDB) {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado el usuario'
            });
        }
        else {
            return res.json({
                "ok": true,
                "usuario": usuarioDB
            });
        }
    });
});
exports.default = usuarioRutas;
