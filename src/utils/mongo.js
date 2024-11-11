import { MongoClient } from "mongodb";

// Cache to store MongoDB client and db instances to prevent reconnecting on each request
let cachedClient = null;
let cachedDb = null;

// MongoDB URI (replace <db_password> with your actual MongoDB password)
const uri =
  "mongodb+srv://shivamupadhyaysocial:kthrhHJ3cP5lKU81@cluster0.apwo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to the database
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached database connection.");
    return { client: cachedClient, db: cachedDb };
  }

  console.log("Establishing new database connection.");
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db("youtube_data"); // Your database name
    console.log("Database connection established successfully.");
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
}

export { connectToDatabase };
