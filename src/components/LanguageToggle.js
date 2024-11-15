import styles from "../styles/videoPage.module.css";

const LanguageToggle = ({ currentLanguage, handleLanguageToggle }) => {
  return (
    <div className={styles.languageToggleContainer}>
      <label className={styles.switch}>
        <input
          className={styles.switchInput}
          type="checkbox"
          onChange={handleLanguageToggle}
          checked={currentLanguage === "hi"}
        />
        <span className={styles.slider}></span>
      </label>
      <p className={styles.languageText}>
        {currentLanguage === "en" ? "Switch to Hindi" : "Switch to English"}
      </p>
    </div>
  );
};

export default LanguageToggle;
