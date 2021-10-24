import mongoose from "mongoose";
import { IAttraction } from "../db";
import { tryCatch, distanceBetweenCoordinates } from "../lib/utils";

export const getAttractions = async () => {
    const Attraction = mongoose.model<IAttraction>("Attraction");

    const [attractions, error] = await tryCatch(() =>
        Attraction.find({}, null, { limit: 40 }).exec()
    );

    return [attractions, error] as const;
};

interface FormatAttractionsArgs {
    attractions: Array<
        mongoose.Document<unknown, unknown, IAttraction> & IAttraction
    >;
    lat: string;
    long: string;
}

type FormatAttractionsReturnType = Array<IAttraction & { distance: number }>;

export const formatAttractions = ({
    attractions,
    lat,
    long
}: FormatAttractionsArgs): FormatAttractionsReturnType => {
    const distanceFromUser = distanceBetweenCoordinates({
        latitude: parseFloat(lat),
        longitude: parseFloat(long)
    });

    return attractions.map((a) => {
        const attraction = a.toJSON();

        const { lat: aLat, long: aLong } = attraction;
        const distance = distanceFromUser({
            latitude: aLat,
            longitude: aLong
        });

        return { ...attraction, distance };
    });
};
