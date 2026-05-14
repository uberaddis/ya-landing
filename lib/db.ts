import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "";

const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error connecting to database: ${e.message}`);
    } else {
      throw new Error("Error connecting to database: Unknown error");
    }
  }
};

export default dbConnect;