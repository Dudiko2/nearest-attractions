import { Handler } from "express";
import { getAttractions, formatAttractions } from "../services/attractions";

export const getNearestAttractions: Handler = async (req, res) => {
    const { lat, long } = req.query;

    if (!lat || !long) {
        return res.status(400).json({ msg: "missing parameters" });
    }

    const latitude = lat.toString();
    const longitude = long.toString();

    const [attractions, error] = await getAttractions();

    if (error) {
        return res.status(500).json({ msg: "server error" });
    }

    const result = attractions
        ? formatAttractions({ attractions, lat: latitude, long: longitude })
              .sort((a, b) => a.distance - b.distance)
              .filter((a) => a.distance <= 40)
        : [];

    return res.json(result);
};
