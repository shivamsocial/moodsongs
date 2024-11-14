import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
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

// Function to get the user location based on IP
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

// Server-Side Rendering: Fetch videos on initial page load
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

  const [currentLanguage, setCurrentLanguage] = useState("en"); // Default language is 'en'
  // Use effect to remove the query params when the component mounts
  useEffect(() => {
    if (videoIndex) {
      // Remove videoIndex query from the URL using replace
      router.replace(`/video/${mood}`, undefined, { shallow: true });
    }
  }, [router, mood, videoIndex]);

  const [videoList, setVideoList] = useState(videos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);

  // Detect language client-side based on location
  useEffect(() => {
    const detectLanguage = async () => {
      const country = await getUserLocation();
      const language = country === "IN" ? "hi" : "en"; // Hindi for India, otherwise English
      setCurrentLanguage(language);
    };

    detectLanguage();
  }, []); // Run only once when the component mounts

  // Fetch videos when page or language changes
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

  // Handle language toggle
  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === "en" ? "hi" : "en";
    setCurrentLanguage(newLanguage); // Update state with the new language
  };

  // Handle next video navigation
  const goToNextVideo = () => {
    if (currentVideoIndex < 4) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else if ((currentPage + 1) * 5 < totalCount) {
      setCurrentPage((prevPage) => prevPage + 1);
      setCurrentVideoIndex(0); // Reset to the first video of the next page
    }
  };

  // Handle previous video navigation
  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    } else if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setCurrentVideoIndex(4); // Set to the last video of the previous page
    }
  };

  const currentVideo = videoList[currentVideoIndex]; // Display the current video

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
          <div className={styles.moodAndPlayingContainer}>
            <h1 className={styles.heading}>
              Now Playing: {moods.find((m) => m.name === mood)?.emoji || ""}{" "}
              {mood}
            </h1>
            <Link href="/" className={styles.changeMoodButton}>
              Change Mood 😀
            </Link>
          </div>

          <div className={styles.languageToggleContainer}>
            <label className={styles.switch}>
              <input
                className={styles.switchInput}
                type="checkbox"
                onChange={handleLanguageToggle}
                checked={currentLanguage === "hi"} // Hindi if checked
              />
              <span className={styles.slider}></span>
            </label>
            <p className={styles.languageText}>
              {currentLanguage === "en"
                ? "Switch to Hindi"
                : "Switch to English"}
            </p>
          </div>

          <div className={styles.glassEffect}>
            {loading && <p className={styles.loadingText}>Loading...</p>}
            {error && <p className={styles.errorText}>{error}</p>}

            {!loading && !error && videoList.length > 0 && (
              <div className={styles.videoCard}>
                <iframe
                  key={currentVideoIndex}
                  className={styles.videoFrame}
                  src={`https://www.youtube.com/embed/${currentVideo?.id}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=0`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture; gyroscope; accelerometer"
                  allowFullScreen
                  title={currentVideo?.snippet.title}
                  loading="lazy" // Lazy loading for iframe
                ></iframe>
                <h3 className={styles.videoTitle}>
                  {currentVideo?.snippet.title}
                </h3>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.buttonNextPrev}
                    onClick={goToPreviousVideo}
                    disabled={currentVideoIndex === 0 && currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className={styles.buttonNextPrev}
                    onClick={goToNextVideo}
                    disabled={
                      currentVideoIndex === videoList.length - 1 &&
                      (currentPage + 1) * 5 >= totalCount
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && videoList.length === 0 && (
              <p className={styles.noVideos}>No embeddable videos available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodPage;
