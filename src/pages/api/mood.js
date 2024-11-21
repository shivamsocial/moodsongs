// pages/api/mood.js

import { storeVideosIfNeeded } from "../../utils/fetchAndStoreVideos";
export default async function handler(req, res) {
  const { mood, language } = req.query;

  // Parse and validate limit and skip as integers
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = parseInt(req.query.skip, 10) || 0;

  // Validate required parameters
  if (!mood || !language) {
    return res.status(400).json({ error: "Mood and language are required" });
  }

  // Debug logging
  console.log("Received request:", { mood, language, limit, skip });

  try {
    console.log("Fetching videos for mood:", mood, "and language:", language);

    // Fetch or retrieve cached videos based on mood and language
    const videos = await storeVideosIfNeeded(mood, language);

    // Get the total count of videos
    const totalCount = videos.length;

    // Pagination logic: slice the videos array for the current page
    const paginatedVideos = videos.slice(skip, skip + limit);
    console.log({ skip, limit, totalVideos: videos.length, paginatedVideos });

    return res.status(200).json({
      videos: paginatedVideos,
      totalCount, // Return total count of videos
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
