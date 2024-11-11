import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios"; // Import axios
import styles from "../../styles/videoPage.module.css";

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
// Function to detect the user's location via their IP using ipinfo.io
const getUserLocation = async () => {
  try {
    const response = await axios.get(
      "https://ipinfo.io/json?token=633baf5f0e0156"
    );
    return response.data.country;
  } catch (error) {
    console.error("Failed to fetch location", error);
    return null;
  }
};

const MoodPage = () => {
  const router = useRouter();
  const { mood, videoIndex } = router.query;
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(parseInt(videoIndex) || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  // Set the language based on location using ipinfo.io
  useEffect(() => {
    const detectLocationAndSetLanguage = async () => {
      const country = await getUserLocation();
      if (country === "IN") {
        setLanguage("hi");
      }
    };
    detectLocationAndSetLanguage();
  }, []);

  // Fetch videos based on mood and language using axios
  useEffect(() => {
    if (mood) {
      setLoading(true);

      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();

      axios
        .get(
          `/api/mood?mood=${mood}&language=${language}&timestamp=${timestamp}`
        )
        .then((response) => {
          const videos = response.data;

          if (Array.isArray(videos)) {
            const embeddableVideos = videos.filter(
              (video) => video.status?.embeddable !== false
            );
            setVideos(embeddableVideos);
          } else {
            setError("Unexpected data format from API");
          }
        })
        .catch((err) => {
          console.error("Error fetching videos:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [mood, language]);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setError("No more videos available.");
    }
  }, [currentIndex, videos.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  return (
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
              checked={language === "hi"}
            />
            <span className={styles.slider}></span>
          </label>
          <p className={styles.languageText}>
            {language === "en" ? "Switch to Hindi" : "Switch to English"}
          </p>
        </div>

        <div className={styles.glassEffect}>
          {loading && <p className={styles.loadingText}>Loading...</p>}
          {error && <p className={styles.errorText}>{error}</p>}

          {!loading && !error && videos.length > 0 && (
            <div className={styles.videoCard}>
              <iframe
                key={currentIndex}
                className={styles.videoFrame}
                src={`https://www.youtube.com/embed/${videos[currentIndex]?.id}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=0`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={videos[currentIndex]?.snippet.title}
                loading="lazy"
              ></iframe>
              <h3 className={styles.videoTitle}>
                {videos[currentIndex]?.snippet.title}
              </h3>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.buttonNextPrev}
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>
                <button
                  className={styles.buttonNextPrev}
                  onClick={handleNext}
                  disabled={currentIndex === videos.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {!loading && !error && videos.length === 0 && (
            <p className={styles.noVideos}>No embeddable videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;
