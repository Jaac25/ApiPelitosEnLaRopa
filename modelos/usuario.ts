import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
    nombres: {
        type:String,
        required: [true, 'Tu nombre es obligatorio']
    },
    apellidos: {
        type:String,
        required: [true, "Tu apellido es obligatorio"]
    },
    documento: {
        type:String,
        unique: true,
        required: [true, "Tu número de documento es obligatorio"]
    },
    rol: {
        type: String,
        required: [true, "Es obligatorio el rol del usuario"]
    },
    telefono: {
        type:String,
        unique: true,
        required: [true, "Tu número de teléfono es obligatorio"]
    },
    ciudad: {
        type:String,
        required: [true, "El nombre de tu ciudad de ubicación es obligatorio"]
    },
    direccion: {
        type: String,
        required: [true, "Tu dirección de residencia es obligatoria"]
    },
    correo: {
        type:String,
        unique: true,
        lowercase: true,
        required: [true, "Tu correo es obligatorio"]
    },
    foto: {
        type:String,
    },
    password: {
        type:String,
        required: [true, "Tu contraseña es obligatoria"]
    },
});

usuarioSchema.method("compararContrasena", function (password: string = ''): boolean{
    if(bcrypt.compareSync(password,this.password)){
        return true;
    }else{
        return false;
    }
});

interface IYo extends Document{
    nombres: string;
    apellidos: string;
    documento: string;
    rol: string;
    telefono: string;
    ciudad: string;
    direccion: string;
    correo: string;
    foto: string;
    password: string;
    compararContrasena(password:String): boolean;
}

export const Usuario = model<IYo>('Usuario',usuarioSchema);