"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import passport = require("./passport");
var serverPort = Number(process.env.PORT) || 2525;
//const passport = require('./passport');
var Server = /** @class */ (function () {
    function Server() {
        this.port = 2525;
        this.app = express_1.default();
        this.port = serverPort;
    }
    Server.prototype.start = function (res) {
        //require('./passport')(passport);
        //this.app.use(passport.initialize())
        this.app.listen(this.port, res);
    };
    return Server;
}());
exports.default = Server;
