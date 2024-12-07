import { storeVideosIfNeeded } from "../../utils/fetchAndStoreVideos";

export default async function handler(req, res) {
  const { mood, language } = req.query;

  // Validate required parameters
  if (!mood || !language) {
    return res.status(400).json({ error: "Mood and language are required" });
  }

  // Debug logging
  console.log("Received request:", { mood, language });

  try {
    console.log("Fetching videos for mood:", mood, "and language:", language);

    // Fetch or retrieve cached videos based on mood and language
    const videos = await storeVideosIfNeeded(mood, language);

    // Get the total count of videos
    const totalCount = videos.length;

    return res.status(200).json({
      videos, // Return all videos
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
