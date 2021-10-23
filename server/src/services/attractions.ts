import mongoose from "mongoose";
import { IAttraction } from "../db";
import { tryCatch } from "../lib/utils";

export const getAttractions = async () => {
    const Attraction = mongoose.model<IAttraction>("Attraction");

    const [attractions, error] = await tryCatch(() =>
        Attraction.find({}, null, { limit: 40 }).exec()
    );

    return [attractions, error] as const;
};
