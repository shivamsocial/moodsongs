import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Home = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const t = useTranslations(); // Use the `t` function from next-intl

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className={styles["home-page"]}>
      <section className={styles.hero}>
        <h2 className={styles.heroHeading}>{t("welcome_heading")}</h2>
        <p className={styles.heroText}>
          At <strong className={styles.strong}>{t("domain")}</strong>
          {t("hero_paragraph_1")}
        </p>
        <p className={styles.heroText}>
          <strong className={styles.strong}>{t("domain")}</strong>{" "}
          {t("hero_paragraph_2")}
        </p>
        <img
          src="/images/land1.jpg"
          alt="Illustration of music's impact on the brain"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </section>

      <section className={styles.science}>
        <h3 className={styles.scienceHeading}>{t("science_heading")}</h3>
        <div className={styles.scienceContent}>
          <div className={styles.scienceText}>
            <p className={styles.scienceParagraph}>{t("science_paragraph")}</p>
            <ul className={styles.scienceList}>
              <li className={styles.scienceListItem}>
                <strong className={styles.strong}>
                  {t("neurochemistry_music")}:
                </strong>{" "}
                {t("neurochemistry_music_description")}
              </li>
              <li className={styles.scienceListItem}>
                <strong className={styles.strong}>
                  {t("mental_health_music")}:
                </strong>{" "}
                {t("mental_health_music_description")}
              </li>
              <li className={styles.scienceListItem}>
                <strong className={styles.strong}>
                  {t("personalized_music")}:
                </strong>{" "}
                {t("personalized_music_description")}
              </li>
            </ul>
          </div>
          <div className={styles.scienceImage}></div>
        </div>
      </section>

      <section className={styles["playlist-challenge"]}>
        <h3 className={styles.playlistChallengeHeading}>
          {t("playlist_challenge_heading")}
        </h3>
        <p className={styles.playlistChallengeText}>
          {t("playlist_challenge_text")}
        </p>
        <ul className={styles.playlistChallengeList}>
          <li className={styles.playlistChallengeListItem}>
            <strong className={styles.strong}>
              {t("playlist_lack_relevance")}:
            </strong>{" "}
            {t("playlist_lack_relevance_description")}
          </li>
          <li className={styles.playlistChallengeListItem}>
            <strong className={styles.strong}>
              {t("playlist_overwhelming_choices")}:
            </strong>{" "}
            {t("playlist_overwhelming_choices_description")}
          </li>
          <li className={styles.playlistChallengeListItem}>
            <strong className={styles.strong}>
              {t("playlist_one_size_fits_all")}:
            </strong>{" "}
            {t("playlist_one_size_fits_all_description")}
          </li>
        </ul>
        <p className={styles.playlistChallengeText}>
          {t("playlist_challenge_text")}
        </p>
      </section>

      <section className={styles["why-moodsongs"]}>
        <h3 className={styles.whyMoodSongsHeading}>
          {t("why_moodsongs_heading")}
        </h3>
        <img
          src="/images/land.jpg"
          alt="Illustration of music's impact on the brain"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
        <ul className={styles.whyMoodSongsList}>
          <li className={styles.whyMoodSongsListItem}>
            <strong className={styles.strong}>
              {t("mood_centric_music")}:
            </strong>{" "}
            {t("mood_centric_music_description")}
          </li>
          <li className={styles.whyMoodSongsListItem}>
            <strong className={styles.strong}>{t("no_signup")}:</strong>{" "}
            {t("no_signup_description")}
          </li>
          <li className={styles.whyMoodSongsListItem}>
            <strong className={styles.strong}>
              {t("instant_access_music")}:
            </strong>{" "}
            {t("instant_access_music_description")}
          </li>
          <li className={styles.whyMoodSongsListItem}>
            <strong className={styles.strong}>
              {t("research_backed_music")}:
            </strong>{" "}
            {t("research_backed_music_description")}
          </li>
          <li className={styles.whyMoodSongsListItem}>
            <strong className={styles.strong}>{t("ad_free_music")}:</strong>{" "}
            {t("ad_free_music_description")}
          </li>
        </ul>
      </section>

      <section className={styles["mood-songs-emotional-wellbeing"]}>
        <h3 className={styles.moodSongsEmotionalWellbeingHeading}>
          {t("mood_songs_emotional_heading")}
        </h3>
        <p className={styles.moodSongsEmotionalWellbeingText}>
          {t("mood_songs_emotional_text")}
        </p>
        <ul className={styles.moodSongsEmotionalWellbeingList}>
          <li className={styles.moodSongsEmotionalWellbeingListItem}>
            <strong className={styles.strong}>{t("stress_reduction")}:</strong>{" "}
            {t("stress_reduction_description")}
          </li>
          <li className={styles.moodSongsEmotionalWellbeingListItem}>
            <strong className={styles.strong}>{t("mood_enhancement")}:</strong>{" "}
            {t("mood_enhancement_description")}
          </li>
          <li className={styles.moodSongsEmotionalWellbeingListItem}>
            <strong className={styles.strong}>
              {t("focus_productivity")}:
            </strong>{" "}
            {t("focus_productivity_description")}
          </li>
        </ul>
        <p className={styles.moodSongsEmotionalWellbeingText}>
          {t("mood_songs_emotional_text")}
        </p>

        <h3 className={styles.researchLinksHeading}>
          {t("research_links_heading")}
        </h3>
        <ul className={styles.researchLinksList}>
          <li className={styles.researchLinksListItem}>
            <Link
              className={styles.researchLink}
              href="https://www.psychologytoday.com/articles/therapeutic-effects-of-music-on-mental-health"
              target="_blank"
            >
              Psychology Today: Therapeutic Effects of Music on Mental Health
            </Link>
          </li>
          <li className={styles.researchLinksListItem}>
            <Link
              className={styles.researchLink}
              href="https://www.nih.gov/news-events/news-releases/music-affects-brain-emotions"
              target="_blank"
            >
              NIH Study: Music Affects Brain and Emotions
            </Link>
          </li>
          <li className={styles.researchLinksListItem}>
            <Link
              className={styles.researchLink}
              href="https://www.apa.org/news/releases/mental-health/music"
              target="_blank"
            >
              American Psychological Association: Music and Mental Health
            </Link>
          </li>
          <li className={styles.researchLinksListItem}>
            <Link
              className={styles.researchLink}
              href="https://www.rug.nl/research/music-and-emotional-regulation"
              target="_blank"
            >
              University of Groningen: Music and Emotional Regulation
            </Link>
          </li>
          <li className={styles.researchLinksListItem}>
            <Link
              className={styles.researchLink}
              href="https://academic.oup.com/jmt"
              target="_blank"
            >
              Journal of Music Therapy
            </Link>
          </li>
        </ul>
      </section>

      <section className={styles.faq}>
        <h3 className={styles.faqHeading}>{t("faq_heading")}</h3>
        <dl className={styles.faqList}>
          <dt
            onClick={() => toggleFAQ(0)}
            className={`${styles.faqItem} ${
              activeFAQ === 0 ? styles.active : ""
            }`}
          >
            {t("faq_question_1")}
          </dt>
          <dd
            className={`${styles.faqAnswer} ${
              activeFAQ === 0 ? styles.show : ""
            }`}
          >
            {t("faq_answer_1")}
          </dd>

          <dt
            onClick={() => toggleFAQ(1)}
            className={`${styles.faqItem} ${
              activeFAQ === 1 ? styles.active : ""
            }`}
          >
            {t("faq_question_2")}
          </dt>
          <dd
            className={`${styles.faqAnswer} ${
              activeFAQ === 1 ? styles.show : ""
            }`}
          >
            {t("faq_answer_2")}
          </dd>

          <dt
            onClick={() => toggleFAQ(2)}
            className={`${styles.faqItem} ${
              activeFAQ === 2 ? styles.active : ""
            }`}
          >
            {t("faq_question_3")}
          </dt>
          <dd
            className={`${styles.faqAnswer} ${
              activeFAQ === 2 ? styles.show : ""
            }`}
          >
            {t("faq_answer_3")}
          </dd>

          <dt
            onClick={() => toggleFAQ(3)}
            className={`${styles.faqItem} ${
              activeFAQ === 3 ? styles.active : ""
            }`}
          >
            {t("faq_question_4")}
          </dt>
          <dd
            className={`${styles.faqAnswer} ${
              activeFAQ === 3 ? styles.show : ""
            }`}
          >
            {t("faq_answer_4")}
          </dd>

          <dt
            onClick={() => toggleFAQ(4)}
            className={`${styles.faqItem} ${
              activeFAQ === 4 ? styles.active : ""
            }`}
          >
            {t("faq_question_5")}
          </dt>
          <dd
            className={`${styles.faqAnswer} ${
              activeFAQ === 4 ? styles.show : ""
            }`}
          >
            {t("faq_answer_5")}
          </dd>

          <dt
            onClick={() => toggleFAQ(5)}
            className={`${styles.faqItem} ${
              activeFAQ === 5 ? styles.active : ""
            }`}
          >
            {t("faq_question_6")}
          </dt>
          <dd
            className={`${styles.faqAnswer} ${
              activeFAQ === 5 ? styles.show : ""
            }`}
          >
            {t("faq_answer_6")}
          </dd>
        </dl>
      </section>
    </div>
  );
};

export default Home;
