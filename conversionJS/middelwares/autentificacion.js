"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
var token_1 = __importDefault(require("../clases/token"));
var verificarToken = function (req, res, next) {
    var usuarioToken = req.get('miToken') || '';
    token_1.default.comprobarToken(usuarioToken).then(function (decoded) {
        req.usuario = decoded.usuario;
        next();
    }).catch(function (err) {
        res.json({
            ok: false,
            mensaje: 'Token inválido',
            err: err
        });
    });
};
exports.verificarToken = verificarToken;
