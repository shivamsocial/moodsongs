// utils/api.js
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Language mappings for YouTube query
const LANGUAGE_MAP = {
  en: "English",
  es: "Español", // Spanish
  hi: "हिंदी", // Hindi
  ko: "한국어", // Korean
  ja: "日本語", // Japanese
  zh: "简体中文", // Simplified Chinese
  de: "Deutsch", // German
  fr: "Français", // French
  it: "Italiano", // Italian
  pt: "Português", // Portuguese
};

// Language to region code mapping for YouTube API
const LANGUAGE_TO_REGION = {
  en: "US", // English -> United States
  es: "ES", // Spanish -> Spain
  hi: "IN", // Hindi -> India
  ko: "KR", // Korean -> South Korea
  ja: "JP", // Japanese -> Japan
  zh: "CN", // Simplified Chinese -> China
  de: "DE", // German -> Germany
  fr: "FR", // French -> France
  it: "IT", // Italian -> Italy
  pt: "BR", // Portuguese -> Brazil
};

// Utility to convert a string to snake_case
const toSnakeCase = (str) => str.toLowerCase().replace(/\s+/g, "_");

// Function to get the correct region code based on language
const getRegionCode = (language) => {
  return LANGUAGE_TO_REGION[language] || "US"; // Default to 'US' if not found
};

// Function to fetch mood translation (currently returns the mood as is)
export const fetchMoodTranslation = async (mood, language) => {
  try {
    const snakeCaseMood = toSnakeCase(mood); // Convert the mood to snake_case
    console.log("Language:", language, "Mood:", snakeCaseMood);

    return snakeCaseMood; // Fallback to the original mood if translation is not found
  } catch (error) {
    console.error("Error fetching mood translation:", error);
    return mood; // Fallback to the original mood on error
  }
};

// Function to fetch songs for a mood
export const fetchSongsForMood = async (mood, language = "en") => {
  try {
    console.log(`Connecting API`);

    // Get the language name for the query
    const languageName = LANGUAGE_MAP[language] || "English";

    // Get the corresponding region code for the YouTube API
    const regionCode = getRegionCode(language);

    // Fetch the translated mood
    const translatedMood = await fetchMoodTranslation(mood, language);

    console.log(
      `Requesting :: ${languageName} ${translatedMood} from region ${regionCode}`
    );

    // Make a request to the YouTube search API to get video IDs based on mood, language, and region
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${translatedMood} songs`, // Query includes the translated mood and language
          type: "video",
          maxResults: 20, // Maximum results to fetch
          regionCode: regionCode, // Specify the region
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
