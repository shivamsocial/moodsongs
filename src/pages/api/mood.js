// pages/api/mood.js or /api/mood.js

import { storeVideosIfNeeded } from "../../utils/fetchAndStoreVideos";
export default async function handler(req, res) {
  const { mood, language = "en", limit = 5, skip = 0 } = req.query;

  // Validate input parameters
  if (!mood || !language) {
    return res.status(400).json({ error: "Mood and language are required" });
  }

  // Log the request to check if it is reaching here
  console.log("Received request for mood:", mood, "and language:", language);

  try {
    console.log("Fetching videos for mood:", mood, "and language:", language);

    // Fetch or retrieve cached videos based on the mood and language
    const videos = await storeVideosIfNeeded(mood, language);

    // Get the total count of videos
    const totalCount = videos.length;

    // Pagination logic (slice the videos array for the current page)
    const paginatedVideos = videos.slice(skip, skip + limit);

    return res.status(200).json({
      videos: paginatedVideos,
      totalCount: totalCount, // Return total count of videos
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({
      error: "Failed to fetch videos",
      message: error.message,
      stack: error.stack,
    });
  }
}
