import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema<IUser>({
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
    password: {
        type:String,
        required: [true, "Tu contraseña es obligatoria"]
    },
});

usuarioSchema.method("compararContrasena", function(password: string = ''): boolean{
    if(bcrypt.compareSync(password,this.password)){
        return true;
    }else{
        return false;
    }
});

interface IUser extends Document{
    nombres: string;
    apellidos: string;
    documento: string;
    rol: string;
    telefono: string;
    ciudad: string;
    direccion: string;
    correo: string;
    password: string;
    compararContrasena(password:String): boolean;
}

export const Usuario = model<IUser>('Usuario',usuarioSchema);