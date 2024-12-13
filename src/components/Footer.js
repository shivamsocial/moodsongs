import React from "react";
import styles from "../styles/grid.module.css"; // Import updated styles
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa"; // Social media icons
import Link from "next/link"; // Importing Link component

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Mood Songs. All rights reserved.</p>

      <div className={styles.footerHeading}>
        <h4>Mood Songs and Mood Music</h4> {/* Heading without translation */}
      </div>

      <div className={styles.socialLinks}>
        <Link href="https://x.com/shivamupdate" passHref>
          <div>
            <FaTwitter aria-label="Twitter" />
          </div>
        </Link>
        <Link href="https://www.linkedin.com/in/shivupa/" passHref>
          <div>
            <FaLinkedin aria-label="LinkedIn" />
          </div>
        </Link>
        <div>
          <Link href="https://t.me/moodsongsmusic" passHref>
            <FaTelegram aria-label="Telegram" />
          </Link>
        </div>
      </div>

      <div className={styles.legalLinks}>
        <Link href="/privacy" className={styles.link}>
          Privacy Policy
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/terms-and-conditions" className={styles.link}>
          Terms and Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
