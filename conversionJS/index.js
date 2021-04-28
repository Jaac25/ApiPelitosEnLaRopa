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
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var petRoutes_1 = __importDefault(require("./rutas/petRoutes"));
var server = new server_1.default();
var config = require("./config");
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Middlewares
server.app.use(express_1.default.json());
server.app.use(express_1.default.urlencoded({ extended: false }));
var storage = multer_1.default.diskStorage({
    destination: 'conversionJS/public/uploads',
    filename: function (req, file, cb) {
        cb(null, (new Date().getTime()) + path_1.default.extname(file.originalname));
    }
});
server.app.use(multer_1.default({ storage: storage }).single("imagePet"));
//Cors
server.app.use((cors_1.default({ origin: true, credentials: true })));
//Rutas
server.app.use('/usuario', usuarioRutas_1.default);
server.app.use('/pet', petRoutes_1.default);
//Public
server.app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public'))).get('/image/:nameImage', function (req, res) {
    var nameImage = req.params.nameImage;
    res.sendFile(path_1.default.join(__dirname, "public/uploads/" + nameImage));
});
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
