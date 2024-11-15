import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Import Head for SEO meta tags
import styles from "../styles/grid.module.css";

const MoodGrid = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error message

  // Memoize the moods array to avoid unnecessary re-renders
  const moods = useMemo(
    () => [
      { emoji: "😀", name: "Happy" },
      { emoji: "💘", name: "Romantic" },
      { emoji: "😌", name: "Relax Chill" },
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
      { emoji: "📻", name: "Lofi" },
    ],
    []
  );

  const handleMoodClick = useCallback(
    async (mood) => {
      setLoading(true); // Show loading state
      setError(""); // Reset any previous errors

      try {
        // Navigate to the video page
        router.push({
          pathname: `/video/[mood]`, // Updated URL structure for "mood-songs"
          query: { mood, videoIndex: 0 }, // Pass the mood and video index to the page
        });
      } catch (err) {
        setError(err.message);
        setLoading(false); // Hide the spinner if an error occurs
      }
    },
    [router]
  );

  useEffect(() => {
    // Listen for route change start and end
    const handleRouteChangeStart = () => {
      setLoading(true); // Show spinner when navigation starts
    };

    const handleRouteChangeComplete = () => {
      setLoading(false); // Hide spinner when navigation is complete
    };

    // Register event listeners
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    // Cleanup listeners when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>
          Mood Songs - Discover the Best MoodSongs and Playlists | Happy,
          Romantic, EDM, Hip-Hop
        </title>
        <meta
          name="description"
          content="Discover the best mood songs to match every emotion. Explore playlists like relaxing mood songs, upbeat mood songs, and more to suit your mood on MoodSongs."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Mood Songs - Discover the Best Mood Songs and Playlists"
        />
        <meta
          property="og:description"
          content="Explore mood songs and find the perfect playlist for every occasion, whether it's relaxing mood songs or energizing tunes."
        />
        <meta
          property="og:image"
          content="https://www.moodsongs.net/images/opengraph-image.png"
        />
        <meta property="og:url" content="https://www.moodsongs.net" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mood Songs",
              "url": "https://www.moodsongs.net",
              "description": "Explore a curated collection of mood songs that cater to every emotional state. From calming tunes to energetic beats, discover the best mood songs on MoodSongs.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.moodsongs.net/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Head>

      <div className={styles.background}>
        <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-40">
          <div className="text-center">
            <h1 className={styles.heading1}>
              Mood Songs - Discover the Best Mood Songs for Every Mood
            </h1>

            <div className={styles.gridContainer}>
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={styles.moodBtn}
                  onClick={() => handleMoodClick(mood.name)} // Navigate on click
                  aria-label={`Explore ${mood.name} mood songs`}
                  disabled={loading} // Disable button during loading
                >
                  <div className={styles.text}>{mood.emoji}</div>
                  <p className={styles.ptext}>{mood.name}</p>
                </button>
              ))}
            </div>

            {loading && (
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.spinnerText}>
                  🤖 AI is curating the perfect playlist for your mood... 🚀🚀
                </p>
              </div>
            )}

            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodGrid;
