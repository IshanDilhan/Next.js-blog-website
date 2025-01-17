import mongoose from "mongoose"

require('dotenv').config(); // Load environment variables



const connectToDatabase = async () => {
  try {
     mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
      connectTimeoutMS: 30000,         // 30 seconds timeout for connection attempt
    });
    console.log("Connected to MongoDB successfully");
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
