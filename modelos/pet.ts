import {Schema, model, Document} from 'mongoose';

const petsSchema = new Schema<IPet>({
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
    lost: {
        type: Boolean,
        required: [true, "Es obligatorio saber si está perdidoo no"],
    },
    adopt: {
        type: Boolean,
        required: [true, "Es obligatorio saber si está en adopción o no"],
    },
    picture: {
        type: String,
    },
});

interface IPet extends Document{
    name: string;
    race: string;
    gender: string;
    traits: string;
    lost: boolean;
    adopt: boolean;
    picture: string;
}

export const Pet = model<IPet>('Pet',petsSchema);