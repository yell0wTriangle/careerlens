import mongoose from "mongoose";

import env from "./env.js";

const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.MONGO_URI);
  console.log("MongoDB connected successfully.");
};

export default connectDB;
