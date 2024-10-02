import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );
    console.log(
      `DB Connected | DB Host - ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("An error occurred while connecting with DB", error);
  }
};

export { connectDb };
