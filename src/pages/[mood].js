import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import VideoPlayer from "../components/VideoPlayer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/videoPage.module.css";
import { useRef } from "react";
import slugify from "slugify"; // Import slugify
import Image from "next/image";
import SimplifiedMoodGrid from "../components/SimplifiedMoodGrid";
import MoodDescription from "../components/MoodDescription";
// Modify slugify to allow German umlauts and Hindi characters

// Constants
const moods = [
  { emoji: "😀", name: "Happy" },
  { emoji: "💘", name: "Romantic" },
  { emoji: "⚡", name: "EDM" },
  { emoji: "🤘", name: "Hip-Hop" },
  { emoji: "🌟", name: "Motivational" },
  { emoji: "💪", name: "Rap" },
  { emoji: "🎸", name: "Rock" },
  { emoji: "🥳", name: "Party" },
  { emoji: "🎷", name: "Jazz" },
  { emoji: "😊", name: "Acoustic" },
  { emoji: "🙏", name: "Folk" },
  { emoji: "🕉️✝️", name: "Devotional" },
  { emoji: "🧘‍♂️", name: "Meditation" },
  { emoji: "👶", name: "Kids" },
  { emoji: "😌", name: "Relax Chill" },
  { emoji: "📻", name: "Lofi" },
  { emoji: "👍", name: "Good" },
  { emoji: "🚗", name: "Driving" },
  { emoji: "✈️", name: "Travel" },
  { emoji: "😢", name: "Sad" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const DEFAULT_LANGUAGE = "en";
const API_TOKEN = "633baf5f0e0156";

// Fetch user location for default language
const fetchUserLocation = async () => {
  try {
    const { data } = await axios.get(
      `https://ipinfo.io/json?token=${API_TOKEN}`
    );
    return data.country || "US";
  } catch (error) {
    console.error("Error fetching location:", error);
    return "US";
  }
};

// Next.js functions for static generation
export async function getStaticPaths() {
  const languages = [
    "en",
    "de",
    "fr",
    "es",
    "it",
    "pt",
    "zh",
    "ja",
    "ko",
    "hi",
  ];
  const paths = [];

  moods.forEach((mood) => {
    languages.forEach((language) => {
      const moodSlug = slugify(mood.name, {
        lower: true,
        remove:
          /[^\w\s\-\u0900-\u097Föäüß\u4e00-\u9fff\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff]/g,
      });
      const path = {
        params: {
          mood: `${moodSlug}-songs`,
        },
        locale: language, // Generate for all languages
      };
      paths.push(path);

      // Log each generated path
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, locale }) {
  const { mood } = params || {}; // Safe destructuring
  if (!mood) {
    return {
      props: {
        videos: [],
        totalCount: 0,
      },
    };
  }

  const moodName = mood.replace("-songs", ""); // Clean the mood name
  const timestamp = new Date().getTime();

  try {
    // Make your API request for videos based on mood and language
    const { data } = await axios.get(`${API_URL}/api/mood`, {
      params: {
        mood: moodName,
        language: locale, // Pass the locale directly to get the right language
        timestamp,
      },
    });

    return {
      props: {
        videos: data.videos || [],
        totalCount: data.totalCount || 0,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        videos: [],
        totalCount: 0,
      },
    };
  }
}

// Main Component
const MoodPage = ({ videos, totalCount }) => {
  const router = useRouter();
  const hasReplacedUrlRef = useRef(false); // Track if the URL has been replaced for Hindi

  const { mood } = router.query;

  const [videoList, setVideoList] = useState(videos || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [queueVideos, setQueueVideos] = useState([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  let currentLanguage = router.locale || DEFAULT_LANGUAGE;
  // Reset video index to 1 when language changes
  useEffect(() => {
    if (currentLanguage !== DEFAULT_LANGUAGE) {
      setCurrentVideoIndex(0); // Reset to the second video (index 1)
    }
  }, [currentLanguage]);
  const prevLocaleRef = useRef(router.locale); // store the previous locale
  useEffect(() => {
    if (mood) {
      // Normalize the mood and remove the "-songs" suffix
      const cleanMood = mood
        .toLowerCase()
        .replace("-songs", "")
        .normalize("NFC"); // Normalize Unicode to NFC form

      // Construct the new URL with the clean mood
      const newUrl = `/${slugify(cleanMood, {
        lower: true, // Convert to lowercase
        remove:
          /[^\w\s\-\u0900-\u097Föäüß\u4e00-\u9fff\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff]/g, // Keep Hindi, German, Chinese, Japanese, and Korean characters
        strict: false, // Allow non-ASCII characters
      })}`;

      // Check if it's Hindi language and if the URL hasn't been replaced yet
      if (
        (router.locale === "hi" ||
          router.locale === "ja" ||
          router.locale === "ko" ||
          router.locale === "zh") &&
        !hasReplacedUrlRef.current
      ) {
        // Replace URL only once for Hindi, Japanese, Korean, and Chinese
        if (router.asPath !== newUrl) {
          router.replace(newUrl);
          hasReplacedUrlRef.current = true; // Mark as replaced
        }
      } else if (!["hi", "ja", "ko", "zh"].includes(router.locale)) {
        // For other languages, replace the URL normally
        if (router.asPath !== newUrl) {
          router.replace(newUrl);
        }
      }
    }
  }, [mood, router]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!mood || !currentLanguage) return; // Ensure both are present

      setLoading(true);
      setLoadingQueue(true);

      try {
        const timestamp = new Date().getTime();
        const moodName = mood.replace("-songs", "");

        const { data } = await axios.get(`${API_URL}/api/mood`, {
          params: {
            mood: moodName,
            language: currentLanguage,
            timestamp,
          },
        });

        setVideoList(data.videos || []);
        setQueueVideos(data.videos || []);
        setCurrentVideoIndex(0); // Reset index on new fetch
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Error fetching videos.");
      } finally {
        setLoading(false);
        setLoadingQueue(false);
      }
    };

    fetchVideos();
  }, [mood, currentLanguage]); // Dependencies - only re-run if mood or language changes

  // Handle video selection from queue
  const selectVideoFromQueue = (index) => {
    setCurrentVideoIndex(index); // Update the index of the currently selected video
  };
  // Handle navigation
  const goToNextVideo = () => {
    if (currentVideoIndex < videoList.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1); // Move to the next video
    } else {
      setCurrentVideoIndex(0); // If it's the last video, reset to the first video
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1); // Move to the previous video
    } else {
      setCurrentVideoIndex(videoList.length - 1); // If it's the first video, go to the last video
    }
  };

  // If the currentVideoIndex is not defined, don't render the component yet
  if (currentVideoIndex === undefined || currentVideoIndex === null) {
    return null; // Or a loading indicator, depending on your use case
  }

  const currentVideo = videoList[currentVideoIndex];

  return (
    <>
      <>
        <Head>
          <title>{`Top ${mood} Mood Songs & Music Playlist vibes on Mood Songs`}</title>
          <meta
            name="description"
            content={`Explore the top ${mood} Mood Songs & Music Playlist vibes on Mood Songs. Watch the best ${mood} songs and discover music for every mood on Mood Songs.`}
          />
          <meta property="og:type" content="video.other" />
          <meta
            property="og:title"
            content={`Top ${mood} Mood Songs & Music Playlist vibes on Mood Songs`}
          />
          <meta
            property="og:description"
            content={`Explore the top ${mood} Mood Songs & Music Playlist vibes on Mood Songs. Watch the best ${mood} songs and discover music for every mood on Mood Songs.`}
          />
          <meta
            property="og:image"
            content={
              currentVideo?.snippet?.thumbnails?.high?.url ||
              "/images/default-thumbnail.jpg"
            }
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`Top ${mood} Mood Songs & Music Playlist vibes on Mood Songs`}
          />
          <meta
            name="twitter:description"
            content={`Explore the top ${mood} Mood Songs & Music Playlist vibes on Mood Songs. Watch the best ${mood} songs and discover music for every mood on Mood Songs.`}
          />
          <meta
            name="twitter:image"
            content={
              currentVideo?.snippet?.thumbnails?.high?.url ||
              "/images/default-thumbnail.jpg"
            }
          />
          <link
            rel="canonical"
            href={`https://www.moodsongs.net${
              router.locale === "en" ? "" : `/${router.locale}`
            }/${slugify(mood, {
              lower: true,
              remove:
                /[^\w\s\-\u0900-\u097Föäüß\u4e00-\u9fff\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff]/g,
            })}`}
          />
          <link
            rel="alternate"
            href={`https://www.moodsongs.net${
              router.locale === "en" ? "" : `/${router.locale}`
            }/${slugify(mood, {
              lower: true,
              remove:
                /[^\w\s\-\u0900-\u097Föäüß\u4e00-\u9fff\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff]/g,
            })}`}
            hreflang={router.locale}
          />
        </Head>
        <Navbar mood={mood} moods={moods} />
        <div className={styles.background}>
          <div className={styles.pageContainer}>
            <div className={styles.glassEffect}>
              {loading ? (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                  <p className={styles.spinnerText}>
                    🤖 Mood Songs is curating the perfect playlist for your
                    mood... 🚀🚀
                  </p>
                </div>
              ) : error ? (
                <p className={styles.errorText}>{error}</p>
              ) : currentVideo ? (
                <VideoPlayer
                  video={currentVideo}
                  currentVideoIndex={currentVideoIndex}
                  goToNextVideo={goToNextVideo}
                  goToPreviousVideo={goToPreviousVideo}
                  videoListLength={videoList.length}
                  totalCount={totalCount}
                  loading={loading}
                  error={error}
                />
              ) : null}

              <div className={styles.queueSection}>
                <h3>Up Next</h3>
                {queueVideos.map((video, index) => (
                  <div
                    key={index}
                    className={`${styles.queueItem} ${
                      index === currentVideoIndex ? styles.active : ""
                    }`}
                    onClick={() => selectVideoFromQueue(index)}
                  >
                    <Image
                      src={
                        video.snippet?.thumbnails?.default?.url ||
                        "/images/default-thumbnail.jpg"
                      }
                      alt={video.snippet?.title || "Default Thumbnail"}
                      width={200} // Set appropriate width for your image
                      height={100} // Set appropriate height for your image
                      className={styles.thumbnailQueue}
                    />
                    <div className={styles.videoInfo}>
                      <h4>{video.snippet?.title}</h4>
                      <p>{video.snippet?.channelTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SimplifiedMoodGrid />
        <MoodDescription />
      </>
      <Footer />
    </>
  );
};

export default MoodPage;
