"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var server_1 = __importDefault(require("./clases/server"));
var usuarioRutas_1 = __importDefault(require("./rutas/usuarioRutas"));
var server = new server_1.default();
var config = require("./config");
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Cors
server.app.use((cors_1.default({ origin: true, credentials: true })));
//Rutas
server.app.use('/usuario', usuarioRutas_1.default);
//Conectar BD
mongoose_1.default.connect(config.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function (err) {
    if (err)
        throw "error BDDDDDDD";
    console.log("Base de datos funcionando");
});
//Levantar servidor
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
