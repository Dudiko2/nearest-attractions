import { Handler } from "express";
import { distanceBetweenCoordinates } from "../lib/utils";
import { getAttractions } from "../services/attractions";

export const getNearestAttractions: Handler = async (req, res) => {
    const { lat, long } = req.query;

    if (!lat || !long) {
        return res.status(400).json({ msg: "missing parameters" });
    }

    const [attractions, error] = await getAttractions();

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
            const attraction = a.toJSON();

            const { lat: aLat, long: aLong } = attraction;
            const distance = distanceFromUser({
                latitude: aLat,
                longitude: aLong
            });

            return { ...attraction, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .filter((a) => a.distance <= 40);

    return res.json(result);
};
