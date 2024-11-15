import Link from "next/link";
import styles from "../styles/videoPage.module.css";

const MoodDetails = ({ mood, moods }) => {
  return (
    <div className={styles.moodAndPlayingContainer}>
      <h1 className={styles.heading}>
        Now Playing: {moods.find((m) => m.name === mood)?.emoji || ""} {mood}
      </h1>
      <Link href="/" className={styles.changeMoodButton}>
        Change Mood 😀
      </Link>
    </div>
  );
};

export default MoodDetails;
