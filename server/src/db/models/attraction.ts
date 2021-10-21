import { Schema, model } from "mongoose";

export interface IAttraction {
    id: number;
    name: string;
    address: string;
    openingHours?: string;
    lat: number;
    long: number;
    website: string;
    attractionType: string;
}

const attractionSchema = new Schema<IAttraction>({
    id: { type: Number, required: true, unique: true },
    name: {
        type: String,
        required: true
    },
    address: { type: String },
    openingHours: { type: String },
    lat: { type: Number },
    long: { type: Number },
    website: { type: String },
    attractionType: { type: String }
});

const attractionModel = model<IAttraction>("Attraction", attractionSchema);

export default attractionModel;
