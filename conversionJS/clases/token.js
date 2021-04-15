"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.getToken = function (payload) {
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.semilla, { expiresIn: this.caducidad });
    };
    Token.comprobarToken = function (userToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1.default.verify(userToken, _this.semilla, function (err, decoded) {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    };
    Token.semilla = 'Semilla-pelitosenlaropa-01';
    Token.caducidad = '1d';
    return Token;
}());
exports.default = Token;
;
