import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/grid.module.css";

const MoodGrid = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // For mood search

  const moods = useMemo(
    () => [
      { emoji: "😀", name: "Happy" },
      { emoji: "💘", name: "Romantic" },
      { emoji: "😌", name: "Relax Chill" },
      { emoji: "📻", name: "Lofi" },
      { emoji: "🥳", name: "Party" },
      { emoji: "👶", name: "Kids" },
      { emoji: "🌟", name: "Motivational" },
      { emoji: "🎸", name: "Rock" },
      { emoji: "💪", name: "Rap" },
      { emoji: "⚡", name: "EDM" },
      { emoji: "🤘", name: "Hip-Hop" },
      { emoji: "🙏", name: "Folk" },
      { emoji: "🕉️✝️", name: "Devotional" },
      { emoji: "😊", name: "Acoustic" },
      { emoji: "🎷", name: "Jazz" },
      { emoji: "🧘‍♂️", name: "Meditation" },
    ],
    []
  );

  // Filter moods based on the search query
  const filteredMoods = useMemo(() => {
    return moods.filter((mood) =>
      mood.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, moods]);

  const handleMoodClick = useCallback(
    async (mood) => {
      setLoading(true);
      setError("");

      try {
        router.push({
          pathname: `/video/[mood]`,
          query: { mood, videoIndex: 0 },
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    },
    [router]
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleInputSubmit = () => {
    // Check if the searchQuery matches any existing mood
    const foundMood = moods.find(
      (mood) => mood.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (foundMood) {
      // If mood found, navigate to that mood's page
      handleMoodClick(foundMood.name);
    } else if (searchQuery.trim()) {
      // If no mood found, treat it as a custom mood and navigate
      handleMoodClick(searchQuery.trim());
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

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
          Mood Songs & Music - Top 20 Playlists for Every Mood | Happy,
          Romantic, Chill, EDM, Lofi & More
        </title>
        <meta
          name="description"
          content="Discover and Listen to the best mood songs and music for every occasion. Explore top playlists for every mood—happy, romantic, chill, energized—and genres like EDM, Rap, Lofi, and more to match your vibe. Start listening now!"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content="en" />

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
        <link rel="canonical" href="https://www.moodsongs.net" />
      </Head>

      <div className={styles.background}>
        <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-40">
          <div className="text-center">
            <h1 className={styles.heading1}>
              Mood Songs - Discover the Best Music Every Mood 💫
            </h1>

            {/* Unified Input for Search & Describe Mood */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search or Describe your mood..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.gridContainer}>
              {filteredMoods.length > 0 ? (
                filteredMoods.map((mood, index) => (
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
                ))
              ) : (
                <div className={styles.buttonWrapper}>
                  <button
                    onClick={handleInputSubmit}
                    className={styles.searchButton}
                    disabled={loading || !searchQuery.trim()}
                  >
                    Submit
                  </button>
                </div>
              )}
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
