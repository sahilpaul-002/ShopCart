import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// Retrieve database credentials from environment variables 
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
console.log(dbUserName, dbPassword);

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@shopcart.f8nivgy.mongodb.net/ShopCart?retryWrites=true&w=majority&appName=ShopCart`, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;