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
  { emoji: "👶", name: "Children" },
  { emoji: "😌", name: "Relax Chill" },
  { emoji: "📻", name: "Lofi" },
];

// Function to get user location (same as before)
const getUserLocation = async () => {
  try {
    const response = await axios.get(
      "https://ipinfo.io/json?token=633baf5f0e0156"
    );
    return response.data.country;
  } catch (error) {
    console.error("Error fetching location:", error);
    return "US"; // Default to 'US' if location fetch fails
  }
};

// Server-Side Rendering: Fetch videos (same as before)
export async function getServerSideProps(context) {
  const { mood } = context.params; // Get mood directly from URL params

  const timestamp = new Date().getTime();

  // Randomize page between 1 and 2, and video index between 0 and 4
  const initialPage = Math.floor(Math.random() * 3) + 1; // Random between 1 and 3
  const initialVideoIndex = Math.floor(Math.random() * 5); // Random between 0 and 4

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch the first batch of videos
  const res = await axios.get(
    `${apiUrl}/api/mood?mood=${mood}&language=en&limit=5&skip=${
      (initialPage - 1) * 5
    }&timestamp=${timestamp}`
  );

  const videos = res.data.videos;
  const totalCount = res.data.totalCount;

  return {
    props: { videos, totalCount, initialPage, initialVideoIndex }, // Pass data as props to the component
  };
}

const MoodPage = ({ videos, totalCount, initialPage, initialVideoIndex }) => {
  const router = useRouter();
  const { mood, videoIndex } = router.query; // Retrieve query params // Get mood directly from the URL

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [videoList, setVideoList] = useState(videos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);

  useEffect(() => {
    if (videoIndex) {
      // Remove videoIndex query from the URL using replace
      router.replace(`/video/${mood}`, undefined, { shallow: true });
    }
  }, [router, mood, videoIndex]);

  useEffect(() => {
    const detectLanguage = async () => {
      const country = await getUserLocation();
      const language = country === "IN" ? "hi" : "en"; // Hindi for India, otherwise English
      setCurrentLanguage(language);
    };

    detectLanguage();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const timestamp = new Date().getTime();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(
          `${apiUrl}/api/mood?mood=${mood}&language=${currentLanguage}&limit=5&skip=${
            (currentPage - 1) * 5
          }&timestamp=${timestamp}`
        );
        const videos = res.data.videos;
        setVideoList(videos);
        setCurrentVideoIndex(0); // Reset video index when new page is loaded
      } catch (err) {
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage, currentLanguage, mood]);

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === "en" ? "hi" : "en";
    setCurrentLanguage(newLanguage); // Update state with the new language
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < 4) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else if ((currentPage + 1) * 5 < totalCount) {
      setCurrentPage((prevPage) => prevPage + 1);
      setCurrentVideoIndex(0); // Reset to the first video of the next page
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    } else if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setCurrentVideoIndex(4); // Go to the last video of the previous page
    }
  };

  const currentVideo = videoList[currentVideoIndex];

  return (
    <>
      <Head>
        <title>{`${mood} Music Videos - MoodSongs`}</title>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodPage;
