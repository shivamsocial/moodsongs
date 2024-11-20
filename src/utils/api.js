import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const fetchSongsForMood = async (mood, language = "en") => {
  try {
    console.log("Connecting API");

    // Set regionCode based on language
    let regionCode = language === "hi" ? "IN" : "US"; // "IN" for Hindi (India), "US" for English (USA)

    // Adjust query based on mood
    let query = `Best ${mood} songs`; // Default query
    if (mood.toLowerCase() === "kids" && language === "hi") {
      query = "hindi kids songs"; // Specific query for Hindi kids songs
      regionCode = "IN";
    }

    // Make a request to the YouTube search API to get video IDs based on mood, language, and region
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query, // Query based on mood and language
          type: "video",
          maxResults: 20, // Maximum results to fetch
          key: API_KEY, // API Key for authentication
          regionCode: regionCode, // Dynamically set regionCode based on language
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
