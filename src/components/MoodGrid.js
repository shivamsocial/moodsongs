import { useState, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Import Head for SEO meta tags
import styles from "../styles/grid.module.css";

const MoodGrid = () => {
  const router = useRouter();
  const loadingRef = useRef(false);
  const errorRef = useRef("");

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

  // Memoize the handleMoodClick function to avoid unnecessary re-creations
  const handleMoodClick = useCallback(
    (mood) => {
      loadingRef.current = true;
      errorRef.current = "";
      try {
        // Navigate to the video page with the selected mood
        router.push({
          pathname: `/video/[mood]`, // Dynamic route
          query: { mood, videoIndex: 0 }, // Pass the mood and video index to the page
        });
      } catch (err) {
        errorRef.current = err.message;
      } finally {
        loadingRef.current = false;
      }
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>
          MoodSongs - Discover Music for Every Mood | Happy, Romantic, EDM,
          Hip-Hop
        </title>
        <meta
          name="description"
          content="Explore and discover music perfectly suited for your current mood with MoodSongs. From happy and party vibes to relaxing and meditation tunes, find it all here."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="MoodSongs - Discover Music for Every Mood"
        />
        <meta
          property="og:description"
          content="Find and play music tailored to your mood on MoodSongs. Enjoy a variety of genres, including EDM, Jazz, Rock, and more."
        />
        <meta
          property="og:image"
          content="https://www.moodsongs.net/images/opengraph-image.png"
        />
        <meta
          property="og:url"
          content="https://www.moodsongs.net/images/opengraph-image.png"
        />
        {/* Structured Data for enhanced SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MoodSongs",
              "url": "https://www.moodsongs.net",
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
              MoodSongs - Discover Music for Every Mood
            </h1>

            <div className={styles.gridContainer}>
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={styles.moodBtn}
                  onClick={() => handleMoodClick(mood.name)} // Navigate on click
                  aria-label={`Explore ${mood.name} music`}
                >
                  <div className={styles.text}>{mood.emoji}</div>
                  <p className={styles.ptext}>{mood.name}</p>
                </button>
              ))}
            </div>

            {loadingRef.current && <div className="spinner">Loading...</div>}
            {errorRef.current && (
              <p className="text-red-500 mt-4">{errorRef.current}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodGrid;
