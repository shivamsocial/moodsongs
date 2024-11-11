import { fetchSongsForMood } from "./api"; // Import the function to fetch songs
import { connectToDatabase } from "./mongo"; // Import the database connection function

// Cache expiration time (1 week in milliseconds)
const CACHE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

export const storeVideosIfNeeded = async (mood, language = "en") => {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();
    const collection = db.collection("videos"); // Access the 'videos' collection

    console.log(`Checking cache for mood: ${mood}, language: ${language}`);

    // Check if cached data exists and is still valid
    const existingData = await collection.findOne({ mood, language });
    const isCacheValid =
      existingData &&
      existingData.timestamp > Date.now() - CACHE_EXPIRATION_TIME;

    if (isCacheValid) {
      console.log(`Cache hit for mood: ${mood}, language: ${language}`);
      return existingData.videos; // Return cached data if valid
    }

    console.log(
      `Cache miss or expired for mood: ${mood}, language: ${language}. Fetching new data...`
    );

    // Fetch new data if no valid cache is found
    const newVideos = await fetchSongsForMood(mood, language);

    // Update the cache with the new data
    await collection.updateOne(
      { mood, language }, // Filter condition
      { $set: { videos: newVideos, timestamp: Date.now() } }, // New data and timestamp
      { upsert: true } // Insert if no existing document matches
    );

    console.log(
      `New data stored in cache for mood: ${mood}, language: ${language}`
    );
    return newVideos; // Return the new data
  } catch (error) {
    // Log more specific errors to help with debugging
    console.error(
      `Error handling videos for mood: ${mood}, language: ${language}`,
      error
    );
    throw new Error(
      `Failed to fetch and store videos for mood: ${mood}. Details: ${error.message}`
    );
  }
};
