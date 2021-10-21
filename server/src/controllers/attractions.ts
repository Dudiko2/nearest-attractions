import { Handler } from "express";
import mongoose from "mongoose";
import { IAttraction } from "../db";
import { distanceBetweenCoordinates, tryCatch } from "../lib/utils";

export const getNearestAttractions: Handler = async (req, res) => {
    const Attraction = mongoose.model<IAttraction>("Attraction");

    const { lat, long } = req.query;

    if (!lat || !long) {
        return res.status(400).json({ msg: "missing parameters" });
    }

    // add lat/long borders
    const [attractions, error] = await tryCatch(() =>
        Attraction.find({}, null, { limit: 40 }).exec()
    );

    if (error) {
        return res.status(500).json({ msg: "server error" });
    }

    // get compare function
    const distanceFromUser = distanceBetweenCoordinates({
        latitude: parseFloat(lat as string),
        longitude: parseFloat(long as string)
    });

    //send relevant entries
    const result = attractions
        ?.map((a) => {
            const { lat: aLat, long: aLong } = a;
            const distance = distanceFromUser({
                latitude: aLat,
                longitude: aLong
            });
            const attraction = a.toJSON();

            return { ...attraction, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .filter((a) => a.distance <= 40);

    return res.json(result);
};
