import express from "express";
import path from "path";

const PORT = process.env.port || 5000;
const app = express();

if (process.env.NODE_ENV === "production")
    app.use(express.static(path.join(__dirname, "../../client/build")));

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
