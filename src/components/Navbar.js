import React, { useState } from "react";
import styles from "../styles/grid.module.css"; // Import the updated styles
import Image from "next/image"; // Importing Image component from Next.js
import { useRouter } from "next/router"; // Import the useRouter hook
import MoodDetails from "./MoodDetails"; // Import the MoodDetails component
import Link from "next/link"; // Import Link component for static navigation

const Navbar = ({ mood, moods }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, asPath, pathname, query } = useRouter(); // Get router properties

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Check if the current page is the mood page by checking if the 'mood' query exists
  const isMoodPage = query.mood !== undefined; // Only on pages where 'mood' is part of the URL

  // Function to construct the language switch URLs
  const getLocalizedUrl = (newLocale) => {
    const basePath = pathname.replace(`/${locale}`, "") || "/";
    return `/${newLocale}${basePath}`;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="/images/headphones.png"
          alt="MoodSongs Logo"
          width={50} // Adjust logo size for smaller screens
          height={50}
        />
      </div>
      {/* Hamburger Icon */}
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* Include MoodDetails only on /video/[mood] pages */}
      {isMoodPage && mood && <MoodDetails mood={mood} moods={moods} />}
      {/* Centered Navigation Links on larger screens, right-aligned on mobile */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>

        {/* Only show language switcher if it's not a mood page */}
        {!isMoodPage && (
          <li className={styles.languageSwitcher}>
            <div className={styles.languageWrapper}>
              <span>Language:</span>
              <select
                value={locale}
                className={styles.languageSelect}
                onChange={(e) =>
                  (window.location.href = getLocalizedUrl(e.target.value))
                }
              >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
