import { fetchSongsForMood } from "./api"; // Import the function to fetch songs
import { connectToDatabase } from "./mongo"; // Import the database connection function

export const storeVideosIfNeeded = async (mood, language = "en") => {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();
    const collection = db.collection("videos"); // Access the 'videos' collection

    console.log(`Checking cache for mood: ${mood}, language: ${language}`);

    // Create a regex pattern to match the mood (case-insensitive)
    const moodRegex = new RegExp(mood, "i"); // 'i' makes it case-insensitive

    // Check if cached data exists using regex for flexible matching
    const existingData = await collection.findOne({
      mood: { $regex: moodRegex }, // Use regex to find moods that match
      language,
    });

    if (existingData) {
      console.log(`Cache hit for mood: ${mood}, language: ${language}`);
      return existingData.videos; // Return cached data if it exists
    }

    console.log(
      `Cache miss for mood: ${mood}, language: ${language}. Fetching new data...`
    );

    // Fetch new data if no cache is found
    const newVideos = await fetchSongsForMood(mood, language);

    // Update the cache with the new data
    await collection.updateOne(
      { mood, language }, // Filter condition
      { $set: { videos: newVideos, timestamp: Date.now() } }, // New data
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
