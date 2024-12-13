import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import styles from "../styles/grid.module.css";

const SimplifiedMoodGrid = () => {
  const router = useRouter();
  const t = useTranslations();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  const handleInputSubmit = () => {
    const foundMood = moods.find(
      (mood) => mood.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundMood) {
      handleMoodClick(foundMood.name);
    }
  };

  const handleMoodClick = useCallback(
    (mood) => {
      setLoading(true);
      const moodPath = `/${mood.toLowerCase().replace(/\s+/g, "-")}`;
      router.push({
        pathname: moodPath,
        query: {
          mood: mood.toLowerCase().replace(/\s+/g, "-"),
        },
      });
    },
    [router]
  );

  return (
    <div className={styles.background}>
      <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-40">
        <h2 className={styles.heading2}>{t("heading2")}</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.gridContainer}>
          {filteredMoods.length > 0 ? (
            filteredMoods.map((mood, index) => {
              const moodPath = `/${mood.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`;
              const localePath =
                router.locale !== "en"
                  ? `/${router.locale}${moodPath}`
                  : moodPath;

              return (
                <a
                  key={index}
                  href={localePath}
                  className={styles.moodBtn}
                  aria-label={`Explore ${mood.name} mood songs`}
                  disabled={loading}
                >
                  <div className={styles.text}>{mood.emoji}</div>
                  <p className={styles.ptext}>{mood.name}</p>
                </a>
              );
            })
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
        )}{" "}
      </div>
    </div>
  );
};

export default SimplifiedMoodGrid;
