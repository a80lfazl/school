import { env } from "@/env";
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log("connect to db");
  } catch (error: any) {
    console.log("error connecting to db", error.message);
  }
};
