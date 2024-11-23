import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import VideoPlayer from "../../components/VideoPlayer";
import MoodDetails from "../../components/MoodDetails";
import LanguageToggle from "../../components/LanguageToggle";
import styles from "../../styles/videoPage.module.css";

// Mood definitions
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
];

// Constants
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const DEFAULT_LANGUAGE = "en";
const API_TOKEN = "633baf5f0e0156"; // IPInfo API token

// Function to get user location
const getUserLocation = async () => {
  try {
    const response = await axios.get(
      `https://ipinfo.io/json?token=${API_TOKEN}`
    );
    return response.data.country;
  } catch (error) {
    console.error("Error fetching location:", error);
    return "US"; // Default to 'US' if location fetch fails
  }
};

// Fetch data during build time
export async function getStaticProps({ params }) {
  const { mood } = params;
  const timestamp = new Date().getTime();
  const randomPage = Math.floor(Math.random() * 2) + 1;

  // Randomize a video index between 0 and 4
  const randomVideoIndex = Math.floor(Math.random() * 5);

  const initialPage = randomPage;
  const initialVideoIndex = randomVideoIndex;
  try {
    const res = await axios.get(
      `${API_URL}/api/mood?mood=${mood}&language=${DEFAULT_LANGUAGE}&limit=5&skip=${
        (initialPage - 1) * 5
      }&timestamp=${timestamp}`
    );

    return {
      props: {
        videos: res.data.videos,
        totalCount: res.data.totalCount,
        initialPage,
        initialVideoIndex,
      },
      revalidate: 3600, // Optional: Revalidate the static page every hour
    };
  } catch (error) {
    console.error("Error fetching data for mood:", error);
    return {
      props: {
        videos: [],
        totalCount: 0,
        initialPage,
        initialVideoIndex,
      },
    };
  }
}

// Generate paths for each mood
export async function getStaticPaths() {
  const paths = moods.map((mood) => ({
    params: { mood: mood.name },
  }));
  return { paths, fallback: false };
}

const MoodPage = ({ videos, totalCount, initialPage, initialVideoIndex }) => {
  const router = useRouter();
  const { mood, videoIndex } = router.query;

  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [videoList, setVideoList] = useState(videos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);

  // Remove videoIndex from URL query
  useEffect(() => {
    if (videoIndex) {
      router.replace(`/video/${mood}`, undefined, { shallow: true });
    }
  }, [router, mood, videoIndex]);

  // Detect user location and language (runs only once)
  useEffect(() => {
    const detectLanguage = async () => {
      const country = await getUserLocation();
      const language = country === "IN" ? "hi" : "en";
      setCurrentLanguage(language);
    };
    detectLanguage();
  }, []);

  // Fetch videos once currentLanguage is set
  useEffect(() => {
    if (currentLanguage === null) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const timestamp = new Date().getTime();
        const res = await axios.get(
          `${API_URL}/api/mood?mood=${mood}&language=${currentLanguage}&limit=5&skip=${
            (currentPage - 1) * 5
          }&timestamp=${timestamp}`
        );
        setVideoList(res.data.videos);
        if (currentPage == 1 && currentVideoIndex == 1) setCurrentVideoIndex(0);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage, currentLanguage, mood]);

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === "en" ? "hi" : "en";
    setCurrentLanguage(newLanguage);
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < 4) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else if (currentPage * 5 < totalCount) {
      setCurrentPage((prevPage) => prevPage + 1);
      setCurrentVideoIndex(0); // Reset to the first video of the next page
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      // If not the first video, just move to the previous video
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    } else {
      // If at the first video of a page and not on the first page, go to the previous page
      setCurrentVideoIndex(4); // Go to the last video of the previous page

      setCurrentPage((prevPage) => prevPage - 1);
      setCurrentVideoIndex(4); // Go to the last video of the previous page
    }
  };
  const currentVideo = videoList[currentVideoIndex];

  return (
    <>
      <Head>
        <title>
          Top 20 {`${mood} Songs & Music`} Videos Playlist - MoodSongs
        </title>
        <meta
          name="description"
          content={`Listen to the best ${mood} music videos on MoodSongs. Experience the perfect mood for every moment.`}
        />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:title"
          content={`${mood} Music Videos - MoodSongs`}
        />
        <meta
          property="og:description"
          content={`Find and enjoy ${mood} music videos tailored to your vibe at MoodSongs.`}
        />
        <meta
          property="og:image"
          content={
            currentVideo?.snippet?.thumbnails?.high?.url ||
            "/images/default-thumbnail.jpg"
          }
        />
        <meta
          property="og:url"
          content={`https://www.moodsongs.net/video/${mood}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${mood} Music Videos - MoodSongs`}
        />
        <meta
          name="twitter:description"
          content={`Watch the best ${mood} music videos only on MoodSongs.`}
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
          href={`https://www.moodsongs.net/video/${mood}`}
        />
      </Head>

      <div className={styles.background}>
        <div className={styles.pageContainer}>
          <MoodDetails mood={mood} moods={moods} />
          <LanguageToggle
            currentLanguage={currentLanguage}
            handleLanguageToggle={handleLanguageToggle}
          />
          <div className={styles.glassEffect}>
            {loading ? (
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.spinnerText}>
                  🤖 AI is curating the perfect playlist for your mood... 🚀🚀
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
                currentPage={currentPage}
                totalCount={totalCount}
                loading={loading}
                error={error}
              />
            ) : (
              <p className={styles.noVideos}>No embeddable videos available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodPage;
