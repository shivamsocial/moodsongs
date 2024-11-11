import { MongoClient } from "mongodb";

// Cache to store MongoDB client and db instances to prevent reconnecting on each request
let cachedClient = null;
let cachedDb = null;

// MongoDB URI from environment variables for security
const uri = process.env.MONGODB_URI; // Store your MongoDB URI in a .env file

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Function to connect to the database
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached database connection.");
    return { client: cachedClient, db: cachedDb };
  }

  console.log("Establishing new database connection.");
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("youtube_data"); // Your database name
    console.log("Database connection established successfully.");
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Failed to connect to the database");
  }
}

export { connectToDatabase };
