import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  } else {
    try {
      await mongoose.connect(
       process.env.NEXT_PUBLIC_MONGODB_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

      isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      throw new Error("someThing went wrong")
    }
  }
};
