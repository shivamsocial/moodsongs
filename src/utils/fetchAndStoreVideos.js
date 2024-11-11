import { fetchSongsForMood } from "./api"; // Ensure this function is correct and working
import { connectToDatabase } from "./mongo";

// Cache expiration time (1 week in milliseconds)
const CACHE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

export const storeVideosIfNeeded = async (mood, language = "en") => {
  const { db } = await connectToDatabase(); // Get the db connection
  const collection = db.collection("videos"); // Access the 'videos' collection

  // Check if videos for the given mood and language are already cached
  const existingData = await collection.findOne({ mood, language });

  // If data exists and is not expired, return it
  if (
    existingData &&
    existingData.timestamp > Date.now() - CACHE_EXPIRATION_TIME
  ) {
    console.log("Its in database");
    return existingData.videos; // Return cached videos
  }

  // If no valid cached data, fetch new data
  try {
    const newVideos = await fetchSongsForMood(mood, language); // Fetch new videos based on mood and language

    // Update or insert new videos in the database
    await collection.updateOne(
      { mood, language }, // Query by mood and language
      { $set: { videos: newVideos, timestamp: Date.now() } }, // Set new data with timestamp
      { upsert: true } // Insert if not exists
    );

    return newVideos; // Return the newly fetched videos
  } catch (error) {
    console.error("Error fetching videos for mood:", mood, error);
    throw new Error("Failed to fetch videos for mood: " + mood); // Throw error to be handled by API handler
  }
};
