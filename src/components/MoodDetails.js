import Link from "next/link";
import styles from "../styles/videoPage.module.css";
import styles1 from "../styles/grid.module.css";

const MoodDetails = ({ mood, moods }) => {
  return (
    <div className={styles.moodAndPlayingContainer}>
      <h1 className={styles.heading}>Playing: {mood}</h1>

      <Link href="/" className={styles.changeMoodButton}>
        Change Mood 😀
      </Link>
    </div>
  );
};

export default MoodDetails;
