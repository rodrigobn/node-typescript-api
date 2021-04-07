import mongoose, { Document, Model } from 'mongoose';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  _id?: String;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
}

const schema = new mongoose.Schema(
  {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
    name: { type: String, require: true },
    position: { type: String, require: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id; //Trasnforma o _id em id
        delete ret._id; //remover esses campos do resultado da transformação
        delete ret.__v;
      },
    },
  }
);

/**
 * Precisa omitir o campo _id do Beach pq no Beach não é obrigatorio, mas no Document é.
 * Precisa do Documento para poder exportar o model
 */
interface BeachModel extends Omit<Beach, '_id'>, Document {}
export const Beach: Model<BeachModel> = mongoose.model('Beach', schema);
