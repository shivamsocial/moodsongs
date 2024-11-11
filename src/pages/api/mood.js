// pages/api/mood.js or /api/mood.js

import { storeVideosIfNeeded } from "../../utils/fetchAndStoreVideos";

export default async function handler(req, res) {
  const { mood, language = "en" } = req.query;

  // Check if the 'mood' parameter is provided
  if (!mood) {
    return res.status(400).json({ error: "Mood is required" });
  }

  res.setHeader("Cache-Control", "no-store, max-age=0");

  // Log the request to check if it is reaching here
  console.log("Received request for mood:", mood, "and language:", language);

  try {
    // Log where the code is going
    console.log("Fetching videos for mood:", mood, "and language:", language);

    // Fetch videos based on the mood and language
    const videos = await storeVideosIfNeeded(mood, language);

    // Ensure videos is an array before sending it back
    if (Array.isArray(videos)) {
      return res.status(200).json(videos);
    } else {
      console.error("Unexpected data format:", videos);
      return res.status(500).json({
        error: "Unexpected data format returned from the database or API",
      });
    }
  } catch (error) {
    console.error("Error occurred while fetching videos:", error);
    return res.status(500).json({
      error: "Failed to fetch videos",
      message: error.message,
      stack: error.stack,
    });
  }
}
