import dotenv from "dotenv";
import express from "express";
import path from "path";
import { getNearestAttractions } from "./controllers/attractions";
import { connectDB } from "./db";

const run = async () => {
    dotenv.config();
    await connectDB();
    const PORT = process.env.PORT || 5000;
    const app = express();

    app.get("/api/attractions", getNearestAttractions);

    if (process.env.NODE_ENV === "production") {
        const rootDir = path.join(__dirname, "../../client/build");
        app.use(express.static(rootDir));
        app.get("*", (_, res) => {
            res.sendFile("index.html", { rootDir });
        });
    }

    app.listen(PORT);
};

run();
