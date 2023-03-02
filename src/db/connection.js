import mongoose from "mongoose";

export const connectMongo = () => {
  mongoose.set("strictQuery", true);

  return mongoose.connect(process.env.MONGO_URL);
};
