// utils/api.js
import axios from "axios";

const API_KEY = "AIzaSyCr6HCvMTAjkJtJLAyt_U1g1U8iiN5Qzpo"; // Your single YouTube API key

export const fetchSongsForMood = async (mood, language = "en") => {
  try {
    console.log("Connecting API");
    // Make a request to the YouTube search API to get video IDs based on mood and language
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${language === "hi" ? "Hindi" : "English"} ${mood} song`, // Query is based on mood and language
          type: "video",
          maxResults: 40, // Maximum results to fetch
          key: API_KEY, // API Key for authentication
        },
      }
    );

    // Extract video IDs from the search response
    const videoIds = response.data.items
      .map((item) => item.id.videoId)
      .join(",");

    // Request more details (snippet, content, and embeddability) for the videos
    const videoDetailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,status",
          id: videoIds, // Use the video IDs obtained from search API
          key: API_KEY, // API Key
        },
      }
    );

    // Filter and return only embeddable videos
    return videoDetailsResponse.data.items.filter(
      (video) => video.status.embeddable
    );
  } catch (error) {
    console.error("Error fetching songs for mood:", error);
    throw new Error("Failed to fetch videos. Please try again.");
  }
};
