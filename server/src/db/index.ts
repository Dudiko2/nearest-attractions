import { connect } from "mongoose";
import attractionModel, { IAttraction } from "./models/attraction";

export const connectDB = async (): Promise<void> => {
    await connect(process.env.MONGO_URI as string);
};

export { attractionModel, IAttraction };
