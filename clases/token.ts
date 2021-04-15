import jwt from 'jsonwebtoken';

export default class Token{
    private static semilla: string = 'Semilla-pelitosenlaropa-01';
    private static caducidad: string = '1d';

    constructor(){}

    static getToken(payload:any): string{
        return jwt.sign({
            usuario: payload
        }, this.semilla, {expiresIn: this.caducidad}
        );
    }
    static comprobarToken(userToken: string){
        return new Promise((resolve,reject)=>{
            jwt.verify(userToken, this.semilla, (err,decoded) => {
                if(err){
                    reject();
                }else{
                    resolve(decoded);
                }
            })
        })
    }
};