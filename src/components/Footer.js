import React from "react";
import styles from "../styles/grid.module.css"; // Import updated styles
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social media icons

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 MoodSongs. All rights reserved.</p>

      <div className={styles.footerHeading}>
        <h4>Mood Songs and Mood Music</h4> {/* Heading without translation */}
      </div>

      <div className={styles.socialLinks}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook aria-label="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter aria-label="Twitter" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram aria-label="Instagram" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin aria-label="LinkedIn" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
