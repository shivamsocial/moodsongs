import Link from "next/link";
import styles from "../styles/videoPage.module.css";
import styles1 from "../styles/grid.module.css";
import { useTranslations } from "next-intl";

const MoodDetails = ({ mood, moods }) => {
  const t = useTranslations(); // Use the `t` function from next-intl

  return (
    <div className={styles.moodAndPlayingContainer}>
      <h1 className={styles.heading}>Playing: {mood}</h1>

      <Link href="/" className={styles.changeMoodButton}>
        {t("changeMood")}
      </Link>
    </div>
  );
};

export default MoodDetails;
