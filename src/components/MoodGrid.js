import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Import Head for SEO meta tags
import styles from "../styles/grid.module.css";

const MoodGrid = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // When a mood is clicked, navigate to the video page with the selected mood
  const handleMoodClick = (mood) => {
    setLoading(true);
    setError("");
    try {
      // Navigate to the video page, passing the mood and initial video index
      router.push({
        pathname: `/video/[mood]`, // Dynamic route
        query: { mood, videoIndex: 0 }, // Pass the mood and video index to the page
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>MoodSongs - Discover Music for Every Mood</title>
        <meta
          name="description"
          content="Explore and discover music perfectly suited for your current mood with MoodSongs. From happy and party vibes to relaxing and meditation tunes, find it all here."
        />
        <meta
          property="og:title"
          content="MoodSongs - Discover Music for Every Mood"
        />
        <meta
          property="og:description"
          content="Find and play music tailored to your mood on MoodSongs. Enjoy a variety of genres, including EDM, Jazz, Rock, and more."
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://www.moodsongs.net" />
        <meta
          name="twitter:title"
          content="MoodSongs - Discover Music for Every Mood"
        />
        <meta
          name="twitter:description"
          content="Listen to music that fits your mood perfectly. Choose from a variety of moods and enjoy the best music selections on MoodSongs."
        />
        <meta name="twitter:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.background}>
        <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-40">
          <div className="text-center">
            <h1 className={styles.heading1}>
              MoodSongs - Discover Music for Every Mood
            </h1>
            <div className={styles.gridContainer}>
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={styles.moodBtn}
                  onClick={() => handleMoodClick(mood.name)} // Navigate on click
                >
                  <div className={styles.text}>{mood.emoji}</div>
                  <p className={styles.ptext}>{mood.name}</p>
                </button>
              ))}
            </div>
            {loading && <div className="spinner">Loading...</div>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodGrid;
