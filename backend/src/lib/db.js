import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB: db.js", error);
    process.exit(1);
  }
};
