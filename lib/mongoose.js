import mongoose from "mongoose"

require('dotenv').config(); // Load environment variables

// MongoDB connection string from .env
const MONGO_URI = "mongodb+srv://ishanwaruna20:Ishan2001@cluster0.fztmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
