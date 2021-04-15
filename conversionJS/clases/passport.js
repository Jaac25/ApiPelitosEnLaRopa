"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = __importDefault(require("passport-jwt"));
var usuario_1 = require("../modelos/usuario");
require("../config");
var JwtStrategy = passport_jwt_1.default.Strategy;
var ExtractJwt = passport_jwt_1.default.ExtractJwt;
var config = require('../config');
module.exports = function (passport) {
    var opts = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        usuario_1.Usuario.find({
            documento: jwt_payload.documento
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
};
