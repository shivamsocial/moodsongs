import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/grid.module.css";

const MoodGrid = () => {
  const router = useRouter(); // Ensure this is declared at the top
  const t = useTranslations(); // Use the `t` function from next-intl

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const moods = useMemo(
    () => [
      { emoji: "😀", name: t("happy") },
      { emoji: "👍", name: t("good") },
      { emoji: "💘", name: t("romantic") },
      { emoji: "😢", name: t("sad") },
      { emoji: "😌", name: t("relax_chill") },
      { emoji: "📻", name: t("lofi") },
      { emoji: "🥳", name: t("party") },
      { emoji: "✈️", name: t("travel") },
      { emoji: "🚗", name: t("driving") },
      { emoji: "👶", name: t("kids") },
      { emoji: "🌟", name: t("motivational") },
      { emoji: "🎸", name: t("rock") },
      { emoji: "💪", name: t("rap") },
      { emoji: "⚡", name: t("edm") },
      { emoji: "🤘", name: t("hip_hop") },
      { emoji: "🙏", name: t("folk") },
      { emoji: "🕉️✝️", name: t("devotional") },
      { emoji: "😊", name: t("acoustic") },
      { emoji: "🎷", name: t("jazz") },
      { emoji: "🧘‍♂️", name: t("meditation") },
    ],
    [t]
  );

  const filteredMoods = useMemo(() => {
    return moods.filter((mood) =>
      mood.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, moods]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  const handleMoodClick = useCallback(
    async (mood) => {
      setLoading(true);

      try {
        router.push({
          pathname: `/${mood.toLowerCase().replace(/\s+/g, "-")}`, // Make sure the mood is formatted correctly
          query: {
            mood: mood.toLowerCase().replace(/\s+/g, "-"), // Only pass the mood here without '-songs'
            videoIndex: 0,
            language: router.locale, // Pass the current language
          },
        });
      } catch (err) {
        setLoading(false);
      }
    },
    [router] // `router` dependency to avoid stale closures
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputSubmit = () => {
    const foundMood = moods.find(
      (mood) => mood.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (foundMood) {
      handleMoodClick(foundMood.name);
    } else if (searchQuery.trim()) {
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
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content={router.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("description")} />
        <meta
          property="og:image"
          content="https://www.moodsongs.net/images/opengraph-image.png"
        />
        <meta property="og:url" content="https://www.moodsongs.net" />

        <link
          rel="alternate"
          href={`https://www.moodsongs.net/${router.locale}`}
          hrefLang={router.locale}
        />
        <link rel="alternate" href="https://www.moodsongs.net" hrefLang="en" />
        <link
          rel="alternate"
          href="https://www.moodsongs.net/de"
          hrefLang="de"
        />
        <link
          rel="alternate"
          href="https://www.moodsongs.net/pt"
          hrefLang="pt"
        />
        <link
          rel="alternate"
          href="https://www.moodsongs.net/it"
          hrefLang="it"
        />
        <link
          rel="alternate"
          href="https://www.moodsongs.net/es"
          hrefLang="es"
        />
        <link
          rel="alternate"
          href="https://www.moodsongs.net/fr"
          hrefLang="fr"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mood Songs",
              url: "https://www.moodsongs.net",
              description:
                "Discover the best mood songs and curated mood music playlists for every feeling and occasion. From happy tunes to relaxing beats, find the perfect playlist for every mood.",
              potentialAction: {
                "@type": "SearchAction",
                target: [
                  "https://www.moodsongs.net/{search_term_string}-mood-music",
                  "https://www.moodsongs.net/{search_term_string}-mood-songs",
                ],
                "query-input": "required name=search_term_string",
              },
              mainEntityOfPage: "https://www.moodsongs.net",
              publisher: {
                "@type": "Organization",
                name: "Mood Songs",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.moodsongs.net/images/favicon-32x32.png",
                },
              },
              image: {
                "@type": "ImageObject",
                url: "https://www.moodsongs.net/images/opengraph-image.png",
                height: "630",
                width: "1200",
              },
              keywords:
                "mood songs, mood music, playlists, happy mood songs, good mood songs, relaxing music, chill music, uplifting mood music, music for every mood",
              language: "en",
              alternateName: [
                { lang: "de", url: "https://www.moodsongs.net/de" },
                { lang: "pt", url: "https://www.moodsongs.net/pt" },
                { lang: "it", url: "https://www.moodsongs.net/it" },
                { lang: "es", url: "https://www.moodsongs.net/es" },
                { lang: "fr", url: "https://www.moodsongs.net/fr" },
              ],
            }),
          }}
        />
        <link rel="canonical" href="https://www.moodsongs.net" />
      </Head>
      <Navbar />
      <div className={styles.background}>
        <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-40">
          <div className="text-center">
            <h1 className={styles.heading1}>{t("heading1")}</h1>
            <h2 className={styles.heading2}>{t("heading2")}</h2>

            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.gridContainer}>
              {filteredMoods.length > 0 ? (
                filteredMoods.map((mood, index) => (
                  <button
                    key={index}
                    className={styles.moodBtn}
                    onClick={() => handleMoodClick(mood.name)}
                    aria-label={`Explore ${mood.name} mood songs`}
                    disabled={loading}
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
                    {t("button_submit")}
                  </button>
                </div>
              )}
            </div>

            {loading && (
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.spinnerText}>{t("ai_loading")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MoodGrid;
