import express from 'express';
//import passport = require("./passport");

const serverPort: number = Number(process.env.PORT) || 2525;
//const passport = require('./passport');

export default class Server{
    public app: express.Application;
    public port: number = 2525;
    constructor(){
        this.app = express();
        this.port = serverPort;
    }
    start(res:any){
        //require('./passport')(passport);
        //this.app.use(passport.initialize())
        this.app.listen(this.port,res)
    }
}