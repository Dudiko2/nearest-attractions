import dotenv from "dotenv";
import express from "express";
import path from "path";
import { getNearestAttractions } from "./controllers/attractions";
import { connectDB } from "./db";

const run = async () => {
    dotenv.config();
    await connectDB();
    const PORT = process.env.port || 5000;
    const app = express();

    app.get("/api/attractions", getNearestAttractions);

    if (process.env.NODE_ENV === "production") {
        console.log("fix this");
        app.use(express.static(path.join(__dirname, "../../client/build")));
    }

    app.listen(PORT);
};

run();
