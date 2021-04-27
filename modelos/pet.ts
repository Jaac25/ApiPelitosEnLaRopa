import {Schema, model, Document} from 'mongoose';

const petsSchema = new Schema({
    name: {
        type:String,
        required: [true, 'El nombre de la mascota es obligatorio']
    },
    race: {
        type:String,
        required: [true, "El tipo de mascota es obligatorio"]
    },
    gender: {
        type:String,
        required: [true, "El genero es obligatorio"]
    },
    traits: {
        type: String,
    },
    picture: {
        type: String,
    },
});

interface IYo extends Document{
    name: string;
    race: string;
    gender: string;
    traits: string;
    picture: string;
}

export const Pet = model<IYo>('Pet',petsSchema);