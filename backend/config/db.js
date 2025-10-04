import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line no-console
    console.log(" MongoDB Connected Successfully");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error connecting to MongoDB:", err.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default connectDB;
