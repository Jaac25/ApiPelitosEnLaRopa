import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Server from './clases/server';
import usuarioRutas from './rutas/usuarioRutas';
import express from 'express';
import multer from 'multer';
import path from 'path';
import petRouter from './rutas/petRoutes';

const server = new Server();
const config = require("./config");

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Middlewares
server.app.use(express.json());
server.app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req,file,cb) => {
        cb(null, (new Date().getTime()) + path.extname(file.originalname));
    }
})
server.app.use(multer({storage}).single("imagePet"));

//Cors
server.app.use((cors({ origin: true, credentials: true })));

//Rutas
server.app.use('/usuario',usuarioRutas);
server.app.use('/pet',petRouter);
    //Public
        server.app.use(express.static(__dirname+'/public'));

//Conectar BD
mongoose.connect(
    config.MONGO,
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify:false
    },
    (err) => {
        if(err) throw "error BDDDDDDD";
        console.log("Base de datos funcionando");
    }
)

//Levantar servidor
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
})